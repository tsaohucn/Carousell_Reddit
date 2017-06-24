"use strict"
import path from 'path'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import uuidv4 from 'uuid/v4'
import flash from 'connect-flash'

// config
const app = express()
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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
var articles = new Object

//routes
app.get('/', function(req, res) {
  res.redirect('/articles')
})

app.get('/articles', function(req, res) {
  res.render('articles/index',{ articles: articles })
})

app.get('/articles/new', function(req, res) {
  res.render('articles/new',{ error: null })
})

app.post('/articles', function(req, res) {
  if (req.body.content.length > 255 || req.body.title.length > 20) {
    req.flash('error',"Post Fail : Your content can't over 255 charts and title can't over 20 charts")
    res.render('articles/new',{ error: req.flash('error') })
  } else {
    req.body.votes = 0
    articles[uuidv4()] = req.body
    res.render('articles/index',{ articles: articles })
  }
})
// ajax API
app.post('/thumbsUp', function(req, res) {
  articles[req.body.uuid].votes ++
  res.send(String(articles[req.body.uuid].votes))
})

app.post('/thumbsDown', function(req, res) {
  if (articles[req.body.uuid].votes > 0) {
    articles[req.body.uuid].votes --
  }
  res.send(String(articles[req.body.uuid].votes))
})

//server
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

export default app