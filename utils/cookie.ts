import cookie from 'cookie';

export const serializeCookie = (bearerRefToken: string, isClear = false) =>
  cookie.serialize('token', bearerRefToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: isClear ? -1 : 60 * 60 * 24 * 30,
    sameSite: 'strict',
    path: '/',
  });
