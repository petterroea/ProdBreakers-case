import { Router } from 'express';

import { getUserRepository } from '../database';
import { User } from '../entities/user';

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
  	uuid: req.params.uuid
  }});
  if(user === undefined) {
  	res.status(404)
  	res.send()
  } else {
  	user.hashedPassword = undefined;
  	res.json(user);
  }
});

export default userRouter;
