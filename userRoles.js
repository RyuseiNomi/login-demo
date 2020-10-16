const ConnectRoles = require('connect-roles');

const userRoles = new ConnectRoles({
  // access restricted contentアクションに失敗した場合は二要素認証へと進む
  failureHandler(req, res, action) {
    if (action === 'access restricted content') {
      return res.redirect('/verify');
    }
    return res.status(403).send('Forbidden');
  },
});

// access restricted contentアクションが実行できるかを判断
userRoles.use('access restricted content', (req) => {
    if (req.user && req.user.role === '2fa authenticated') {
        return true;
    }
    return false;
});

module.exports = userRoles;