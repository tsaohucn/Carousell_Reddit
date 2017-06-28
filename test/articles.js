import request from 'supertest'
import expect from 'expect.js'
import rewire from 'rewire'
import sinon from 'sinon'
import { server } from '../app'

server.close()

var base = 'http://localhost:3000'
var app = rewire('../app.js');
app.__set__("articles",[{id: 'no1', title: 'title', content: 'content', votes: 10},{id: 'no2', title: 'title', content: 'content', votes: 0}])

describe("app",function(){

  describe('POST thumbsUp increase votes', function() {
    it('should exist', function(done){
      request(base)
        .post('/thumbsUp')
        .send({
          'uuid' : 'no1'
        })
        .end(function(err, res){
          expect(res.status).to.be.eql(200)
          expect(res.text).to.be.eql(11)
          done();
      })
    })
  });

  describe('POST thumbsDown reduce votes', function() {
    it('should exist', function(done){
      request(base)
        .post('/thumbsDown')
        .send({
          'uuid' : 'no1'
        })
        .end(function(err, res){
          expect(res.status).to.be.eql(200)
          expect(res.text).to.be.eql(10)
          done();
      })
    })

    it('should exist and reduce votes', function(done){
      request(base)
        .post('/thumbsDown')
        .send({
          'uuid' : 'no2'
        })
        .end(function(err, res){
          expect(res.status).to.be.eql(200)
          expect(res.text).to.be.eql(0)
          done();
      })
    })
  });

  describe('POST articles', function() {
    it('should exist and create new article', function(done){
      request(base)
        .post('/articles')
        .send({
          'title' : 'new article',
          'content' : 'new content'
        })
        .end(function(err, res){
          expect(res.status).to.be.eql(200)
          expect(app.__get__("articles").length).to.be.eql(3)
          done();
      })
    })
  });
})
