var request = require('supertest');
var expect = require('chai').expect;
var bodyParser = require('body-parser');
var path = require('path');

// links to client side

var url = "localhost:3000"

describe('', function() {


  describe('get index ', function() {

    it('returns 200', function(done) {
      request(url)
        .get('/')
        .expect(200)
        .end(done);
    });


  });


  describe('get api ', function() {

    it('returns 200 for search', function(done) {
      request(url)
        .get('/api/search?name=sentinel')
        .expect(200)
        .end(done);
    });

    it('returns 200 for reviews', function(done) {
      request(url)
        .get('/api/reviews/1')
        .expect(200)
        .end(done);
    });

    it('returns 200 for restaurant', function(done) {
      request(url)
        .get('/api/restaurant/1')
        .expect(200)
        .end(done);
    });


    it('returns 404 at root', function(done) {
        request(url)
          .get('/api/')
          .expect(404)
          .end(done);
    });


  });
  describe('post api ', function() {

    it('returns 202 for post to root', function(done) {
      request(url)
        .post('/api/')
        .send({ 
          user_id: '1', 
          restaurant_id: '1',
          rating: 5,
          dish_name: 'food',
          text: 'was food',
          image_url: 'http://pngimg.com/upload/chicken_PNG2145.png'
        })
        .expect(202)
        .end(done);
    });



  });
});