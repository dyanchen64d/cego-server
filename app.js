const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config.js')
const request = require('./libs/request.js')
const User = require('./libs/user.js')
const uid = require('uid-safe')
const cookieParser = require('cookie-parser')
const checkExpired = require('./libs/expired.js')

// remove all
// User.remove({}, function (err) {
//   console.log(err);
// })

// find all
User.find({}).exec(function (err, docs) {
  console.log(docs);
})

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(checkExpired()); // 判断 token 是否过期

// set 3rd_session in mongodb
app.post('/code2session', function (req, res, next) {
  // console.log(req.body);
  request.doget(config.wxurl, {
    js_code: req.body.code,
    appid: config.appid,
    secret: config.secret,
    grant_type: 'authorization_code'
  }).then((body) => {
    let bodyObj = JSON.parse(body)
    let sessionid = uid.sync(24)

    // 如果得到的 openid 已经存在于 mongo 中
    // 更新对应的 doc 中的 session_key key3rd expires3rd
    // 否则要插入新的 doc
    User.find({openid: bodyObj.openid}).exec(function (err, docs) {
      if (docs.length > 0) {
        User.update({openid: bodyObj.openid}, {
          session_key: bodyObj.session_key,
          key3rd: sessionid,
          expires3rd: new Date().getTime() + (7000 * 1000)
        }).exec().then((err) => {
          res.send(sessionid)
        })
      } else {
        User.create({
          key3rd: sessionid,
          expires3rd: new Date().getTime() + (7000 * 1000),
          session_key: bodyObj.session_key,
          expires_in: bodyObj.expires_in,
          openid: bodyObj.openid
        }, (err, doc) => {
          res.send(sessionid)
        });
      }
    })
  })
})

// set user location intro
app.post('/set-profile', function (req, res, next) {
  let sessionid = req.userInfo.key3rd
  let body = req.body

  User.findOneAndUpdate({key3rd:sessionid}, {
    latitude: body.location.latitude,
    longitude: body.location.longitude,
    name: body.location.name,
    address: body.location.address,
    intro: body.intro
  }, (err, doc) => {
    if (!err) {
      res.send('success')
    } else {
      console.log('/set-profile', err);
    }
  })
})

// get Locatoins
app.post('/get-locations', function (req, res, next) {
  User.find({}).exec(function (err, docs) {
    if (err) { res.send(err); }

    let arr = docs.map((item, index) => {
      return {
        latitude: item.latitude,
        longitude: item.longitude,
        name: item.name,
        address: item.address,
        intro: item.intro
      }
    })
    res.send(arr)
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
