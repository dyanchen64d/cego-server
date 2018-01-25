const User = require('./user.js')

module.exports = function () {
  return async function (req, res, next) {
    if (req.cookies.token) {

      let query = await User.findOne({ key3rd: req.cookies.token }).exec()

      // 检查 token 是否过期
      let now = new Date().getTime()
      if (!query || now > query.expires3rd) {
        res.send('expired')
        return;
      }

      req.userInfo = query;
    }

    await next();
  }
}
