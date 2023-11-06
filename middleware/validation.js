var validator = require('validator');
var db = require('../conf/database');

module.exports = {
    usernameCheck: function(req, res, next){
        var {username} = req.body;
        username.username.trim(); // avoid user to put space left/right

        if(!validator.islength(username, {min:3})){
            req.flash("error", "username must be 3 or more characters");
        }

        if(!/[a-zA-Z]/.test(username.charAt(0))){
            req.flash("error", "username must begiin with a character");
        }    

        if(req.session.flash.error){
            res.redirect('/registration')
        } else {
            next();
        }

    },
    passwordCheck: function(req, res, next){},
    emailCheck: function(req, res, next){},
    tosCheck: function(req, res, next){},
    agecheck: function(req, res, next){}, 
    isUsernameUnique: async function(req, res, next){

        var {username} = req.body;

         try{
          // * check username uniqueness
          // check if user is in the table
          var [rows, fields] = await db.execute(`SELECT id FROM users WHERE username = ?;`, [username]);
          

          if(rows && rows.length > 0){
              req.flash("error", `${username} is already taken`);
              return req.session.save(function (err) {
                 return res.redirect('/registration')
                }); 
            } else {
                next();
            }
        } catch(error){
            next(error);
        }
    },
    isEmailUnique: async function(req, res, next){
        var {email} = req.body;
        try {
            // * check email uniqueness
            var [rows, fields] = await db.execute(`SELECT id FROM users WHERE email = ?;`, [email]);
            if(rows && rows.length > 0){
                return res.redirect('/registration');
            }
        } catch (error) {
            next();
        }
    },
};