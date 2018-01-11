const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const birds = require('./routers/birds')
const config = require('./config.js')
const request = require('./libs/request.js')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use('/birds', birds)
// app.get('/', (req, res) => res.send('Hello World!'))

app.post('/getSessionKeyAndOpenId', (req, res) => {
  // console.log(req.body);
  let qs = {
    js_code: req.body.code,
    appid: config.appid,
    secret: config.secret,
    grant_type: 'authorization_code'
  }
  request.doget(config.wxurl, qs).
    then((body) => {
      // console.log(body);
      res.send({body: JSON.parse(body)})
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
