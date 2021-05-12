export default {
  jwt: {
    secret: process.env.APP_JWT_SECRET as string,
    expiresIn: '1d',
  },
};
