"use strict"
import path from 'path'
import express from 'express'

const app = express()
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('index')
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

export default app