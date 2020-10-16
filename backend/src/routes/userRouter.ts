import { Router } from 'express';

const userRouter = Router();


userRouter.get('/', (_req, res) => {
  console.log('Someone says hi');
  res.send('Hi');
});

export default userRouter;
