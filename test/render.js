import request from 'supertest'
import expect from 'expect.js'
import sinon from 'sinon'
import ejs from 'ejs'
import { app } from '../app'

describe("app",function(){

  describe('GET home page', function() {
    before(function() {
      return this.spy = sinon.spy(app, 'render');
    });
    after(function() {
      return this.spy.restore();
    });
    it('should exist', function(done){
      request(app)
          .get('/')
          .end(function(err, res){
            expect(res.status).to.be.eql(200)
              done();
          })
    })
    return it('should render the "index" view', function() {
      return expect(this.spy.getCall(0).args[0]).to.be.eql('index');
    });
  });

  describe('GET all articles', function() {
    before(function() {
      return this.spy = sinon.spy(app, 'render');
    });
    after(function() {
      return this.spy.restore();
    });
    it('should exist', function(done){
      request(app)
          .get('/articles')
          .end(function(err, res){
            expect(res.status).to.be.eql(200)
              done();
          })
    })
    return it('should render the "articles/index" view', function() {
      return expect(this.spy.getCall(0).args[0]).to.be.eql('articles/index');
    });
  });

  describe('GET form', function() {
    before(function() {
      return this.spy = sinon.spy(app, 'render');
    });
    after(function() {
      return this.spy.restore();
    });
    it('should exist', function(done){
      request(app)
          .get('/articles/new')
          .end(function(err, res){
            expect(res.status).to.be.eql(200)
              done();
          })
    })
    return it('should render the "articles/new" view', function() {
      return expect(this.spy.getCall(0).args[0]).to.be.eql('articles/new');
    });
  });

  describe('POST articles with title < 20 and content < 255', function() {
    before(function() {
      return this.spy = sinon.spy(app, 'render');
    });
    after(function() {
      return this.spy.restore();
    });
    it('should exist', function(done){
      request(app)
          .post('/articles')
          .send({
            'title' : 'test',
            'content' : 'test'
          })
          .end(function(err, res){
            expect(res.status).to.be.eql(302)
            expect(res.header['location']).to.contain('/articles')
              done();
          })
    })
  });

  describe('POST articles with title > 20 and content < 255', function() {
    before(function() {
      return this.spy = sinon.spy(app, 'render');
    });
    after(function() {
      return this.spy.restore();
    });
    it('should exist', function(done){
      request(app)
          .post('/articles')
          .send({
            'title' : 'qwqweqeqeqeqe2d3dlou2',
            'content' : 'test'
          })
          .expect(200)
          .end(function(err, res){
              done();
          })
    })
    return it('should render the "articles/new" view', function() {
      return expect(this.spy.getCall(0).args[0]).to.be.eql('articles/new');
    });
  });

  describe('POST articles with title < 20 and content > 255', function() {
    before(function() {
      return this.spy = sinon.spy(app, 'render');
    });
    after(function() {
      return this.spy.restore();
    });
    it('should exist', function(done){
      request(app)
          .post('/articles')
          .send({
            'title' : 'test',
            'content' : 'ateqeqweqweknlknddnlkasndalkdnakdnaksdniqwdqiwndqdnqdkqdstteqeqweqweknlknddnlkasndalkdnakdnaksdniqwdqiwndqdnqdkqdstteqeqweqweknlknddnlkasndalkdnakdnaksdniqwdqiwndqdnqdkqdstteqeqweqweknlknddnlkasndalkdnakdnaksdniqwdqiwndqdnqdkqdst23usjdlfoiuysjhytrfgyhhidjh'
          })
          .expect(200)
          .end(function(err, res){
              done();
          })
    })
    return it('should render the "articles/new" view', function() {
      return expect(this.spy.getCall(0).args[0]).to.be.eql('articles/new');
    });
  });

})