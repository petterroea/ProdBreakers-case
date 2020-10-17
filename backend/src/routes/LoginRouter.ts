import { Router } from 'express';

import { getUserRepository } from '../database'
import passport from 'passport';
import LocalStrategy from 'passport-local';

const loginRouter = Router();

passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = getUserRepository().findOne({where: {
      username: username
    }})
    .then((user) => {
      if (!user) { return done(null, false); }
      if (!user.comparePassword(password)) { return done(null, false); }
      return done(null, user);
    })
  }
));

loginRouter.post('/', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('../');
  });

  loginRouter.get('/',
    (req, res) => {res.send({info: 'lorem ipsum ?'})}
  );
export default loginRouter;
