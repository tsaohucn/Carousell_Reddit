"use strict"
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var articles = new Array
//routes
app.get('/', function(req, res) {
  res.render('index')
})

app.get('/articles', function(req, res) {
  res.render('articles/index',{ articles: articles })
})

app.get('/articles/new', function(req, res) {
  res.render('articles/new')
})

app.post('/articles', function(req, res) {
  req.body.votes = 0
  articles.push(req.body)
  res.render('articles/index',{ articles: articles })
})

//server
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

export default app