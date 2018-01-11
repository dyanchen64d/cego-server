const request = require('request')

module.exports = (function () {
  return {
    doget (url, qs) {
      return new Promise((resolve, reject) => {
        try {
          request({
            method: 'GET',
            url: url,
            qs: qs
          }, function (err, res, body) {
            // console.log(body);
            return resolve(body)
          })
        } catch (e) {
          return reject(e)
        }
      })
    }
  }
})();
