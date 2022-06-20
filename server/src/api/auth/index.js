import Router from 'koa-router'
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/login', authCtrl.login);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);
auth.post('/register', authCtrl.register);

export default auth;
