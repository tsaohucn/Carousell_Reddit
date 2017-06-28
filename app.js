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

// ------App config------
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

// ------Save articles in memory------
var articles = new Array

// ------Routes------
// ------Http get------
// Get /
// #### home page to show top 20 articles sort by votes ####
app.get('/', function(req, res) {
  // #### use slice() to clone a new articles then sort and return only top 20 articles
  const articles_top_20 = articles.slice().sort(function(a,b){return b.votes-a.votes}).slice(0,20)
  res.render('index',{ articles: articles_top_20 })
})
// Get /articles
// #### articles page to show all articles ####
app.get('/articles', function(req, res) {
  res.render('articles/index',{ articles: articles })
})
// Get /articles/new
// #### article new page to show form let user can create new article ####
app.get('/articles/new', function(req, res) {
  res.render('articles/new',{ error: null })
})

// ------Http post------
// Post /articles
// #### title and content need correspond limit or return /articles/new.ejs ####
// #### if correspond limit then create new article and save in global variable ####
app.post('/articles', function(req, res) {
  // #### if title no smaller than 20 or content no smaller than 255 then render /articles/new.ejs ####
  if (req.body.content.length > 255 || req.body.title.length > 20) {
    req.flash('error',"Post Fail : Your content can't over 255 charts and title can't over 20 charts")
    res.render('articles/new',{ error: req.flash('error') })
  } else {
  // #### if title and content correspond limit then create new article and give it uuid as well as postTime ####
  // #### then push to articles variable then redirect to Get /articles ####
    const title = req.body.title
    const content = req.body.content
    const id = uuidv4()
    const postTime = dateTime.create().format('Y-m-d H:M:S')
    const article = { id: id, title: title, content: content, votes: 0, postTime: postTime }
    articles.push(article)
    res.redirect('/articles')
  }
})

// ------Ajax API------
// #### for thumbsUp and thumbsDown ####
// Post /thumbsUp
app.post('/thumbsUp', function(req, res) {
  let article = articles.find(ele => ele.id === req.body.uuid)
  article.votes ++
  // #### return votes count to let view page to refresh votes count ####
  res.send(String(article.votes))
})

// Post /thumbsDown
app.post('/thumbsDown', function(req, res) {
  // #### find correspond article by uuid that user click on
  let article = articles.find(ele => ele.id === req.body.uuid)
  // #### votest min must be zero ####
  if (article.votes > 0) {
    article.votes --
  }
  // #### return votes count to let view page to refresh votes count ####
  res.send(String(article.votes))
})

// ------Server------
var server = app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!')
})

export { app, server }