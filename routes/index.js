const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//デモのためのTestユーザー
const TestUser = {
  username: 'test',
  password: '20201017'
}

passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log(`username: ${username}, password: ${password}`);
    if (username === '')
        return done(null, false);
    else if (password === '')
        return done(null, false);
    else if (username !== TestUser.username || password !== TestUser.password) {
        return done(null, false, {message: 'ユーザー名またはパスワードが正しくありません。'});
    }
    else {
        return done(null, {username: username, role: ''});
    }
  }));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());


/* GET */
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});

// ログイン
router.post('/login', 
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/account'
  }));

module.exports = router;
