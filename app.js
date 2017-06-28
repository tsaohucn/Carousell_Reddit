"use strict"
import path from 'path'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import uuidv4 from 'uuid/v4'
import flash from 'connect-flash'
import dateTime from 'node-datetime'
import xssFilters from 'xss-filters'
import csurf from 'csurf'

// config
const app = express()
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash())

// save articles in memory
var articles = new Array

// routes
// home page
app.get('/', function(req, res) {
  const articles_top_20 = articles.slice().sort(function(a,b){return b.votes-a.votes}).slice(0,20)
  res.render('index',{ articles: articles_top_20 })
})
// all articles
app.get('/articles', function(req, res) {
  res.render('articles/index',{ articles: articles })
})
// form
app.get('/articles/new', function(req, res) {
  res.render('articles/new',{ error: null })
})
// publish new article
app.post('/articles', function(req, res) {
  if (req.body.content.length > 255 || req.body.title.length > 20) {
    req.flash('error',"Post Fail : Your content can't over 255 charts and title can't over 20 charts")
    res.render('articles/new',{ error: req.flash('error') })
  } else {
    const title = req.body.title
    const content = req.body.content
    const id = uuidv4()
    const postTime = dateTime.create().format('Y-m-d H:M:S')
    const article = { id: id, title: title, content: content, votes: 0, postTime: postTime }
    articles.push(article)
    res.render('articles/index',{ articles: articles })
  }
})

// ajax API
app.post('/thumbsUp', function(req, res) {
  let article = articles.find(ele => ele.id === req.body.uuid)
  article.votes ++
  res.send(String(article.votes))
})

app.post('/thumbsDown', function(req, res) {
  let article = articles.find(ele => ele.id === req.body.uuid)
  if (article.votes > 0) {
    article.votes --
  }
  res.send(String(article.votes))
})

//server
var server = app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!')
})

export { app, server }