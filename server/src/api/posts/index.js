import Router from 'koa-router';
import * as postCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.get('/:id', postCtrl.getPostById, postCtrl.read);

posts.post('/', checkLoggedIn, postCtrl.write);
posts.patch('/:id', postCtrl.getPostById, checkLoggedIn, postCtrl.checkOwnPost, postCtrl.update);

posts.delete('/:id', postCtrl.getPostById, checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove);


export default posts;