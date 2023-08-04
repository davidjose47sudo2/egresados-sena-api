export const JWT_COOKIE_NAME = 'access_token';

export const JWT_CONSTANTS = {
  secret: process.env.JWT_SECRET || 'secretKey',
  signOptions: { expiresIn: '15d' },
};
