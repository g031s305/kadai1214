var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId', function(req, res, next) {
  //res.send('respond with a resource');
  let arr = [];
  if(req.user.username === 'Kudo'){
  for(let i = 1; i <= req.params.userId; i++){
    if(i % 15 === 0){
        arr.push('FizzBuzz')
    }else if(i % 3 === 0){
        arr.push('Fizz')
    }else if(i % 5 === 0){
        arr.push('Buzz')
    }else{
        arr.push(i) 
    }
  }
  let fizzbuzz = arr.join(' ');
  res.send(fizzbuzz);
}else{
  req.session.error = 'login failed';
  res.redirect('/login');
}
});
module.exports = router;
