import Joi from 'joi';
import User from '../../models/user';

// POST /api/auth/register
// 회원 가입
export const register = async ctx => {
  const schema = Joi.object().keys({
    userId: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
    nickname: Joi.string(),
  })

  const validationResult = schema.validate(ctx.request.body);
  if (validationResult.error) {
    ctx.response.status = 400;
    ctx.response.body = validationResult.error;

    return;
  }

  const { userId, password, nickname } = ctx.request.body;
  try {
    const exsistUserId = await User.findByUserId(userId);
    const exsistNickname = nickname === ('' || undefined) ? false : await User.findByNickname(userId);

    if (exsistUserId || exsistNickname) {
      ctx.response.status = 409; // conflict
      ctx.response.body = "already exsist";
      return;
    }

    const user = new User({
      userId,
      // 닉네임을 입력하지 않았다면 id를 닉네임으로 set
      nickname: nickname ? nickname : userId
    });
    // 비밀번호 설정
    await user.setPassword(password);
    // 비밀번호 저장
    await user.save();
    ctx.response.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access-token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// POST /api/auth/login
// 로그인
/*
  {
    userId,
    password
  }
*/
export const login = async ctx => {
  const { userId, password } = ctx.request.body;

  // 아이디와 비밀번호가 없는경우
  if (!userId || !password) {
    ctx.response.status = 401; // Unauthorized
    ctx.response.body = "Unauthorized";
    console.log("아이디 혹은 비밀번호 오류");
    return;
  }

  try {
    const user = await User.findByUserId(userId);
    // 계정이 없는경우
    if (!user) {
      ctx.response.status = 401;
      ctx.response.body = "Unauthorized";
      console.log("없는 계정")
      return;
    }

    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.response.status = 401;
      ctx.response.body = "Unauthorized";
      console.log("비밀번호 오류")
      return;
    }

    ctx.response.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access-token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// POST /api/auth/logout
// 로그아웃
export const logout = async ctx => {
  ctx.cookies.set('access-token');
  ctx.response.status = 204; // No Content
};

// GET /api/auth/check
// 로그인 상태 체크
export const check = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    ctx.response.status = 401; // Unauthorized
    return;
  }

  ctx.response.body = user;
}
