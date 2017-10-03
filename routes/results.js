var express = require('express');
var router = express.Router();
var _twit = require('twit');
var mongoose = require('mongoose');

var configTwit = require('../configTwit');

var twitter = new _twit(configTwit);

var Query = require('../models/querySchema');
var Tweet = require('../models/tweetSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = req.query.twitquery;
  var newQuery = new Query({ content: query.toString() });
  newQuery.save(function(err){
      if(err){
          console.log(err);
      }else{
          console.log('newQuery store successfully!');
      }
  });

  var searchContent = {
      q: query,
      count: 300
  };
  twitter.get('search/tweets', searchContent, getData);
  function getData(err, data, response) {
      data.statuses.forEach(function(statuse){
          var newTweet = new Tweet({
              author: statuse.user.name,
              screenName: statuse.user.screen_name,
              createTime: statuse.created_at,
              text: statuse.text,
              query: newQuery
          });
          newTweet.save(function(err){
              if(err){
                  console.log(err);
              }else{
                  console.log('newQuery store successfully!');
              }
          });
      });
      res.render('results', {data: data});
  };
});

module.exports = router;
