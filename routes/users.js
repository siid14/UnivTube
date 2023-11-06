var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
var {isLoggedIn, isMyProfile} = require('../middleware/auth');
const { isUsernameUnique, usernameCheck, passwordCheck, emailCheck, tosCheck, agecheck, isEmailUnique } = require('../middleware/validation');


// * GET localhost:3000/users 
// router.get('/', async function(req, res, next) {
//   try {
//     let [rows, fields] = await db.query(`select * from users;`);
// res.status(200).json({rows, fields});
//   }catch (error) {
//     next(error);
//   }
// });

// * localhost:3000/users/login
router.post('/login', async function (req, res, next){
 const {username, password} = req.body;
 // console.log(req.body) // to print the body data (only html attribute) after the request is sent to the server
 // res.end(); // end the request

 try {
 if(!username || !password){
 return res.redirect("/login");
 } else {
   var [rows, fields] = await db.execute(`SELECT id, username, password, email FROM users WHERE username = ?;`, [username]);
  }

 var user = rows[0];
 if (!user){
  req.flash("error", `Log In Failed: Invalid username/password`);
  req.session.save(function(err){
    return res.redirect("/login");
  })
  } else {
    var passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
     req.session.user = {
         userId: user.id,
         email: user.email, 
         username: user.username
     };
      req.flash("success", `You are logged in!`);
      req.session.save(function(err){
        return res.redirect("/");
      })
    } else {
      return res.redirect('/login');
    }
  };
} catch (error) {
  next(error);
}
});

// * localhost:3000/users/registration
router.post('/registration', 
usernameCheck, 
passwordCheck, 
emailCheck, 
tosCheck, 
agecheck, 
isUsernameUnique, 
isEmailUnique,  
async function (req, res, next){
  var {username, email, password} = req.body;
  // console.log(req); // to print the body data (whole body) after the request is sent to the server
   // res.end();
  try{

   var hashPassword = await bcrypt.hash(password, 3); // hashing password

   // * insert inside database row
   var[resultObject, fields] = await db.execute(`INSERT INTO users
   (username, email, password)
   VALUE
   (?,?,?);`, [username, email, hashPassword]);
   //  console.log(resultObject);
   //  res.end();

    // * respond
    if(resultObject && resultObject.affectedRows == 1){
     req.flash("success", `Account for ${username} was created!`);
     return res.redirect('/login');
    } else {
     return res.redirect('/registration');
    }  
  
} catch(error) {
next(error);
}
});

//// * localhost:3000/users/profile/<integer number>
router.get("/profile/:id(\\d+)", isLoggedIn, isMyProfile, function(req,res){
//  console.log(req.params);
 res.render("profile");
});



module.exports = router;