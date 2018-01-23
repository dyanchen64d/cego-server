var express = require('express')
var router = express.Router()
var fs = require('fs')

// middleware that is specific to this router
router.use(function (req, res, next) {
  console.log('router craft essence ....')
  next()
})

// define the home page route
// router.get('/', function (req, res) {
//   res.send('Birds home page')
// })

// define the about route
router.get('/craft-essences', function (req, res) {

  // 读取文件
  let data = fs.readFileSync('./libs/craft_essence.txt')

  res.send(JSON.parse(data))
})

module.exports = router
