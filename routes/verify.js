const express = require('express');
const ensureLogin = require('connect-ensure-login');

const router = express.Router();


/* GET */
router.get('/', ensureLogin.ensureLoggedIn('/'), (req, res) => {
  res.render('verify', {user: req.user});
});

// 二要素認証ページからPOSTされた際の処理
router.post('/', ensureLogin.ensureLoggedIn('/'), async (req, res) => {

});

module.exports = router;
