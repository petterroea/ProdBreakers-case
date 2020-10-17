import jwt from 'jsonwebtoken';

import { getUserRepository } from '../database';

const JWT_KEY = process.env.JWT_KEY ?? 'flugelhorn';

const userMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.substring(7);
      console.log(authorization);
      console.log(token);
      const payload = jwt.verify(token, JWT_KEY);
      const { userId } = payload;
      const user = await getUserRepository().findOne({where: {
        uuid: userId,
      }});
      req.user = user;
      next();
    } else {
      console.log(authorization);
      res.sendStatus(401);
    }
  } catch (e) {
    console.log('Error');
    console.log(e);
    res.sendStatus(401);
  }
};

export default userMiddleware;
