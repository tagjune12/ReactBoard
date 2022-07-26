import Post from '../../../src/models/post';
import { mongoose } from 'mongoose';
import Joi from 'joi';
import Comment from './../../models/comment';
import Reply from './../../models/reply';
import replies from './../replies/index';

// id 유효성 체크후 post가져오기
const { ObjectId } = mongoose.Types;
export const getPostById = async (ctx, next) => {
  const { id } = ctx.request.params;
  if (!ObjectId.isValid(id)) {
    ctx.response.status = 400; // Bad Request
    return;
  }

  try {
    const post = await Post.findById(id);
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.response.status = 404;
      return;
    }

    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }

  return next();
}

// 자신이 쓴 post인지 확인
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.author._id.toString() !== user._id) {
    ctx.response.status = 403; // Forbidden
    return;
  }
  // if (post.author._id !== user._id) {
  //   ctx.response.status = 403; // Forbidden
  //   return;
  // }

  return next();
}

// GET /api/posts?nickname=&category=&page=
// 글 목록 가져오기
export const list = async ctx => {
  const page = parseInt(ctx.request.query.page || '1', 10);

  if (page < 1) {
    ctx.response.status = 400;
    ctx.response.body = "Bad Request";

    return;
  }

  const { category, nickname } = ctx.request.query;
  const query = {
    ...(nickname ? { nickname } : {}),
    ...(category ? { category } : {})
  };

  try {
    const POST_PER_PAGE = 5;
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(POST_PER_PAGE)
      .skip((page - 1) * POST_PER_PAGE)
      .lean()
      .exec();

    const postCount = await Post.countDocuments(query).exec();
    ctx.response.set('Last-Page', Math.ceil(postCount / POST_PER_PAGE));
    ctx.response.body = posts.map(post => ({
      ...post,
      body: post.content.length > 200 ? post.content : `${post.content.slice(0, 200)}...`
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// GET /api/posts/:id
// 특정 글 읽기
export const read = async ctx => {
  ctx.response.body = ctx.state.post;
}

// POST /api/posts
// 글 쓰기
/*
  {
    category,
    title,
    content
  }
*/
export const write = async ctx => {
  // body값 유효성 체크
  const schema = Joi.object().keys({
    category: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  })
  const validationResult = schema.validate(ctx.request.body);

  if (validationResult.error) {
    ctx.response.status = 400; // Bad Request
    ctx.response.body = validationResult.error;
    return;
  }

  const { title, content, category } = ctx.request.body;
  const post = new Post({
    category,
    title,
    content,
    author: {
      ...ctx.state.user,
      _id: ctx.state.user._id
      // _id: ctx.state.user._id.toString()
      // _id: ctx.state.user.get("_id").toString()
    }
  });

  try {
    await post.save();
    ctx.response.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
}

// PATCH /api/posts:id
// 글 수정
/*
{
  title,
  content,
  category
}
*/
export const update = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required()
  });

  const validationResult = schema.validate(ctx.request.body);

  if (validationResult.error) {
    ctx.response.status = 400; // Bad Request
    ctx.response.body = validationResult.error;
    return;
  }

  const { id } = ctx.request.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();
    ctx.response.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
}

// DELETE /api/posts/:id
// 글 삭제
export const remove = async ctx => {
  const { id } = ctx.request.params;
  // console.log(ctx.state);

  try {
    const comments = await Comment.find({ postId: id }).exec();
    // console.log(comments);
    const commentIds = comments.map(comment => comment._id.toString());
    // console.log(commentIds);
    const replies = await Reply.find({ commentId: commentIds });
    // console.log(replies);
    await Reply.deleteMany({ commentId: commentIds }).exec();
    await Comment.deleteMany({ postId: id }).exec();
    await Post.findByIdAndRemove(id).exec();

    ctx.response.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
}

// PATCH /api/posts/like/:id
// 좋아요 
export const like = async ctx => {

  const { id } = ctx.request.params;
  const userObjectId = ctx.state.user._id;
  const likeUsers = ctx.state.post.like.findIndex(_id => _id === userObjectId) < 0 ?
    [...ctx.state.post.like, userObjectId] : // 새로 추가
    ctx.state.post.like.filter(_id => _id !== userObjectId); // 제거

  try {
    const post = await Post.findByIdAndUpdate(id, {
      like: likeUsers
    }, {
      new: true
    }).exec();
    ctx.response.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
}