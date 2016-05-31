var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    member : null
  });
});

router.post('/', function(req, res, next) {
  var inAccount = req.body.account;
  var inPassword = req.body.password;
  Member.getByAccount(inAccount, function(err, member){
    if(err || inPassword != member.password){
      res.render('loginFail',{
        member : null
      })
    }else {
      req.session.member = member;
      res.redirect('/');
    }
  })
});

router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


module.exports = router;
