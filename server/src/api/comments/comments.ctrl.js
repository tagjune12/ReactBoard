import Joi from 'joi';
import Comment from '../../models/comment';
import { mongoose } from 'mongoose';

const { ObjectId } = mongoose.Types;
export const getCommentById = async (ctx, next) => {
  const { id } = ctx.request.params; // comment id
  if (!ObjectId.isValid(id)) {
    ctx.response.status = 400; // Bad Request
    return;
  }

  try {
    const comment = await Comment.findById(id);
    // 댓글이 존재하지 않을 때
    if (!comment) {
      ctx.response.status = 404;
      return;
    }

    ctx.state.comment = comment;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }

  return next();
}

// 자신이 쓴 댓글인지 확인
export const checkOwnComment = (ctx, next) => {
  const { user, comment } = ctx.state;

  if (comment.author._id.toString() !== user._id) {
    ctx.response.status = 403; // Forbidden
    return;
  }

  return next();
}


// GET /api/comments?postId=
export const list = async ctx => {
  const postId = ctx.request.query.postId;
  const query = {
    ...postId
  };

  try {
    const comments = await Comment.find(query).sort({
      _id: -1
    })
      .lean()
      .exec();
    ctx.response.body = comments;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// POST /api/comments/:id
/*
  {
    content
  }
*/
export const write = async ctx => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
  });

  const validationResult = schema.validate(ctx.request.body);

  if (validationResult.error) {
    ctx.response.status = 400; // Bad Request
    ctx.response.body = validationResult.error;
    return;
  }

  const { content } = ctx.request.body;
  const comment = new Comment({
    postId: ctx.state.post._id,
    content,
    author: ctx.state.user
  });

  try {
    await comment.save();
    ctx.response.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
}

// DELETE /api/comments/:id ==> 여기서 id는 댓글 id임
// 댓글 삭제
export const remove = async ctx => {
  const { id } = ctx.request.params;
  try {
    await Comment.findByIdAndRemove(id).exec();
    ctx.response.status = 204;
  } catch (e) {
    ctx.response.throw(500, e);
  }
}


// PATCH /api/comments/:id ==> 여기서 id는 댓글 id임
// 댓글 수정
/*
  {
    content
  }
*/
export const update = async ctx => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
  });

  const validationResult = schema.validate(ctx.request.body);

  if (validationResult.error) {
    ctx.response.status = 400; // Bad Request
    ctx.response.body = validationResult.error;
    return;
  }

  const { id } = ctx.request.params;
  try {
    const comment = await Comment.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();
    ctx.response.body = comment;
  } catch (e) {
    ctx.throw(500, e);
  }
}