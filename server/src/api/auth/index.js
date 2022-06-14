import Router from 'koa-router'
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/auth', authCtrl.login);
auth.post('/auth', authCtrl.logout);
auth.post('/auth', authCtrl.check);