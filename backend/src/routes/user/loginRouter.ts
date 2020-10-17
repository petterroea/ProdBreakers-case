import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { getUserRepository } from '../../database'
import { User } from '../../entities/user';

const JWT_KEY = process.env.JWT_KEY ?? 'flugelhorn';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  try {
    console.log(req);
    console.log(req.body);
    const username: string = req.body.username;
    const password: string = req.body.password;
    const user: User = await getUserRepository().findOne({where: {
      username: username
    }});
    if (user && user.comparePassword(password)) {
      const token = jwt.sign({ userId: user.id }, JWT_KEY);
      user.hashedPassword = undefined;
      res.json({
        user,
        token,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

loginRouter.get('/',
  (req, res) => {res.send({info: 'lorem ipsum ?'})}
);
export default loginRouter;
