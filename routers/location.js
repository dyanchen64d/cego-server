const express = require('express')
const router = express.Router()
const User = require('../libs/user.js')

router.use(function (req, res, next) {
  console.log('router location ....')
  next()
})

// set user location intro
router.post('/set-profile', function (req, res, next) {
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
router.post('/get-locations', function (req, res, next) {
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

module.exports = router
