import Router from 'koa-router';
import * as postCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.get('/:id', postCtrl.read);

posts.post('/', postCtrl.write);
posts.patch('/:id', postCtrl.update);

posts.delete('/:id', postCtrl.remove);



export default posts;