const express = require('express');
const { ensureLoggedIn } = require('connect-ensure-login');


const router = express.Router();

// アカウントページへのアクセス
// トップページ ('/')でログイン済みの場合にaccountを表示
router.get('/', ensureLoggedIn('/'), (req, res) => {
  res.render('account', {user: req.user});
});

// ログアウト
router.post('/logout', ensureLoggedIn('/'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
