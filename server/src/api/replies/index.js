import Router from "koa-router";
import { getCommentById } from '../comments/comments.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as repliesCtrl from './replys.ctrl';

const replies = new Router();

replies.get('/', repliesCtrl.list);
replies.post('/:id', getCommentById, checkLoggedIn, repliesCtrl.write);
replies.delete('/:id', repliesCtrl.getReplyById, checkLoggedIn, repliesCtrl.checkOwnReply, repliesCtrl.remove);
replies.patch('/:id', repliesCtrl.getReplyById, checkLoggedIn, repliesCtrl.checkOwnReply, repliesCtrl.update);

export default replies