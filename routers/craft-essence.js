var express = require('express')
var router = express.Router()
var fs = require('fs')
var data = JSON.parse(fs.readFileSync('./libs/craft_essence.txt'))

// middleware that is specific to this router
// router.use(function (req, res, next) {
//   next()
// })

// define the home page route
router.get('/', function (req, res) {
  res.send('Craft Essence Home Page')
})

// define the about route
router.get('/craft-essences', function (req, res) {

  // console.log(req.query);

  let _data = data, count = 20;

  if (req.query.atkhp === 'atk') {

  } else if (req.query.atkhp === 'hp') {

  } else if (req.query.atkhp === 'atkhp') {

  }

  if (req.query.cost) {

  }

  if (req.query.index) {
    let idx = Number(req.query.index);
    res.send({
      index: idx,
      count: count,
      list: _data.slice(idx, count + idx)
    })
  }
})

module.exports = router
