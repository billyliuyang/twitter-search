var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Search' });
});

router.post('/',function(req, res) {
    var query = "";
    if(req.body.name != ""){
        var names = req.body.name.split(",");
        for(var i = 0; i < names.length ; i++){
            query = query.concat(names[i]);
            if(i != names.length - 1){
                query = query.concat(" OR ");
            }else {
                if(document.getElementById('or1').checked && ((req.body.team != null) || (req.body.author != null))){
                    query = query.concat(" OR ");
                }else {
                    query = query.concat(" ");
                }
            }
        }
    }
    if(req.body.team != ""){
        var teams = req.body.team.split(",");
        for(var i = 0; i < teams.length ; i++){
            query = query.concat(teams[i]);
            if(i != teams.length - 1){
                query = query.concat(" OR ");
            }else {
                if(document.getElementById('or2').checked && (req.body.author != null)){
                    query = query.concat(" OR ");
                }else {
                    query = query.concat(" ");
                }
            }
        }
    }
    if(req.body.author != ""){
        query = query.concat("from:"+req.body.author+" ");
    }
    if(req.body.keyword != ""){
        var keywords = req.body.keyword.split(",");
        for(var i = 0; i < keywords.length ; i++){
            query = query.concat(keywords[i]);
            if(i != keywords.length - 1){
                query = query.concat(" OR ");
            }
        }
    }

    console.log(query);

    res.redirect('/results/?twitquery=' + query);
});

module.exports = router;
