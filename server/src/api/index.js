import Router from 'koa-router';
import posts from './posts';
import auth from './auth'
import comments from './comments';
import replies from './replies';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/comments', comments.routes());
api.use('/replies', replies.routes());

export default api;
