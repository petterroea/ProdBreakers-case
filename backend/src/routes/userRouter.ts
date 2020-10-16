const userRouter = require('express').Router();


userRouter.get('/', (_req, res) => {
  console.log('Someone says hi');
  res.send('Hi');
});

module.exports = userRouter;