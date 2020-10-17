import passport from 'passport';
import LocalStrategy from 'passport-local';
//import User;

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    },(email,password,done) => {
        return done(null,{email: email, password: password})
    }
));

passport.authenticate()