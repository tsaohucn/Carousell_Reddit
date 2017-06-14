import assert from 'assert'
import request from 'supertest'
import app from '../app'

describe('GET /articles/new', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/articles/new')
      .set('Accept', 'application/json')
      .expect(200, {
        name: 'tobi'
      })
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })
})