var express = require('express');
var router = express.Router();
/* new */
const crypto = require('crypto');
const connection = require('../db');
const authCheck = require('../authCheck');

/* GET users listing. */
/* new */
router.get('/create', function(req, res, next){
  res.render('users/create', {error: ''});
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId', function(req, res, next) {
  //res.send('respond with a resource');
  res.send(req.params.userId);
});

/* new */
router.post('./create', authCheck, async function(req, res, next){
  const newUser = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
  };
  console.log(newUser);
  (await connection)
  .getRepository('users_test')
  .save(newUser)
  .then((savedUser) => {
    console.log(savedUser);
    res.redirect('/');
  })
  .catch(error => {
    console.log(error)
    res.render('users/create', { error });
  });
})

module.exports = router;
