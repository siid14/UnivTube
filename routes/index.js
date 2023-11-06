var express = require('express');
var router = express.Router();

const { isLoggedIn } = require('../middleware/auth');
const { getRecentsPost } = require('../middleware/post');


/* GET home page. */
router.get('/', getRecentsPost, function(req, res, next) {
  res.render('index', { title: 'UnivTube', name:"Sidney Thomas", js:["index-client-side.js"] });
});

router.get('/login', function(req,res){
  res.render('login', { title: 'Login' , css: ["style.css"]});
});

router.get('/registration', function(req,res){
  res.render('registration', { title: 'Registration' , css: ["style.css"], js:["registration.js"]});
});

router.get('/postvideo', isLoggedIn, function(req,res){
  res.render('postvideo', { title: 'Postvideo', css: ["style.css"]});
});

// to protect profile route
// router.use(function(req, res, next){
// if(req.session.user){
//   next();
// } else {
//   res.redirect('/login');
// }
// });

router.get('/profile', function(req,res){
  res.render('profile', { title: 'Profile' , css: ["style.css"]});
});



router.get('/logout', isLoggedIn, async function (req, res, next){
  req.session.destroy(function(err){
      if(err){
       next(err);
      } return res.redirect('/');
      })
  });

module.exports = router;
