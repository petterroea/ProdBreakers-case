import { Router } from 'express';

import { getUserRepository } from '../database';
import { User } from '../entities/user';
import loginRouter from './user/loginRouter';
import registerRouter from './user/registerRouter';

const userRouter = Router();

const censorUserMap = (user: User) => {
	user.hashedPassword = undefined;
	return user;
}


userRouter.get('/', async (req, res) => {
  const users = (await getUserRepository().find()).map(censorUserMap);
  res.json(users);
});

userRouter.get('/:uuid', async (req, res) => {
  const user = await getUserRepository().findOne({where: {
  	id: req.params.uuid
  }});
  user.hashedPassword = undefined;
  res.json(user);
});

userRouter.use('/login', loginRouter);

userRouter.use('/register', registerRouter);

export default userRouter;
