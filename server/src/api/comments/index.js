import Router from 'koa-router';
import * as commentsCtrl from './comments.ctrl';
import { getPostById } from '../posts/posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const comments = new Router();

comments.get('/', commentsCtrl.list);
comments.post('/:id', getPostById, checkLoggedIn, commentsCtrl.write);
comments.delete('/:id', commentsCtrl.getCommentById, checkLoggedIn, commentsCtrl.checkOwnComment, commentsCtrl.remove);
comments.patch('/:id', commentsCtrl.getCommentById, checkLoggedIn, commentsCtrl.checkOwnComment, commentsCtrl.update);
comments.patch('/like/:id', commentsCtrl.getCommentById, checkLoggedIn, commentsCtrl.checkOwnComment, commentsCtrl.like);



export default comments;