var pg = require('pg');
var sanitize = require('./utils').sanitize

var dbUrl = process.env.DATABASE_URL || 'postgres://username:@localhost/mountainwolf';

module.exports = {
  search: function(query, cb) {
    var queryStr = "SELECT * FROM restaurants WHERE LOWER(name) like LOWER('%" + sanitize(query) + "%');";
    pg.connect(dbUrl, function(err, client, done) {
      client.query(queryStr, function(err, result) {
        done();
        if( err ) {
          console.error(err);
        } else {
          cb(result.rows);
        }
      });
    });
  },
  restaurantInfo: function(id, cb) {
    var queryStr = "SELECT * FROM restaurants WHERE id = " + id + ";";
    pg.connect(dbUrl, function(err, client, done) {
      client.query(queryStr, function(err, result) {
        done();
        if( err ) {
          console.error(err);
        } else {
          cb(result.rows);
        }
      });
    });
  },
  restaurantReviews: function(id, cb) {
    var queryStr = "SELECT reviews.rating, reviews.dish_name, reviews.text, reviews.image_url, \
                    users.user_name, restaurants.name FROM reviews INNER JOIN users \
                    ON reviews.user_id = users.id INNER JOIN restaurants ON \
                    reviews.restaurant_id = restaurants.id WHERE restaurant_id = " + id + " \
                    ORDER BY reviews.id DESC;";
    pg.connect(dbUrl, function(err, client, done) {
      client.query(queryStr, function(err, result) {
        done();
        if( err ) {
          console.error(err);
        } else {
          cb(result.rows);
        }
      });
    });
  },
  postReview: function(user_id, restaurant_id, rating, dish_name, text, image_url, cb) {

    var queryStr = "INSERT into reviews (user_id, restaurant_id, rating, dish_name, text, \
                    image_url) values ("+user_id+","+restaurant_id+","+rating+",'"
                    + sanitize(dish_name)+"','"+sanitize(text)+"','"+sanitize(image_url)+"');";
    console.log(queryStr);
    pg.connect(dbUrl, function(err, client, done) {
      client.query(queryStr, function(err, result) {
        done();
        if( err ) {
          console.error(err);
        } else {
          cb(result.rows);
        }
      });
    });
  },

};