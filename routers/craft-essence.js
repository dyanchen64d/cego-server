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

  // atkhp 筛选
  switch (req.query.atkhp ) {
    case 'atk':
      _data = _data.filter((elem, idx) => {
        return (Number(elem.atk) > 0) && (Number(elem.hp) <= 0)
      })
      break;
    case 'hp':
      _data = _data.filter((elem, idx) => {
        return (Number(elem.hp) > 0) && (Number(elem.atk) <= 0)
      })
      break;
    case 'atkhp':
      _data = _data.filter((elem, idx) => {
        return (Number(elem.atk) > 0) && (Number(elem.hp) > 0)
      })
      break;
    default:
  }

  // rarity 筛选
  switch (req.query.rarity) {
    case 'yichi':
      _data = _data.filter((elem, idx) => {
        return elem.rarity.split(' ')[0].length === 1
      })
      break;
    case 'ni':
      _data = _data.filter((elem, idx) => {
        return elem.rarity.split(' ')[0].length === 2
      })
      break;
    case 'san':
      _data = _data.filter((elem, idx) => {
        return elem.rarity.split(' ')[0].length === 3
      })
      break;
    case 'yon':
      _data = _data.filter((elem, idx) => {
        return elem.rarity.split(' ')[0].length === 4
      })
      break;
    case 'go':
      _data = _data.filter((elem, idx) => {
        return elem.rarity.split(' ')[0].length === 5
      })
      break;
    default:
  }

  // effect 筛选
  if (req.query.effect) {
    let effectArr = req.query.effect.split(',')

    for (let i=0; i<effectArr.length; i++) {
      if (effectArr[i] === 'all') continue;
      _data = _data.filter((elem, idx) => {
        return elem.effect.includes(effectArr[i])
      })
    }
  }

  let idx = Number(req.query.index);
  res.send({
    index: idx,
    count: count,
    list: _data.slice(idx, count + idx)
  })
})

module.exports = router
