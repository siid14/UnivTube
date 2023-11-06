var express = require('express');
var router = express.Router();
var multer = require("multer");
var db = require('../conf/database');

const { isLoggedIn } = require("../middleware/auth");
const { makeThumbnail, getPostById, getCommentsForPostById } = require('../middleware/post');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/videos/uploads");
    },
    filename: function (req, file, cb) {
      var fileExt = file.mimetype.split("/")[1];
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    },
});
  
const upload = multer({ storage: storage })

router.post("/create", isLoggedIn, upload.single("uploadVideo"), makeThumbnail, async function(req, res, next){
  // console.log(req);
  // console.log(req.file);
  console.log(req.body);
  // res.end();

  // info needed to make a new post
  var {title, description} = req.body;
  var {path, thumbnail} = req.file;
  var {userId} = req.session.user;

  try {
    if (typeof title === 'undefined') {
      throw new Error('Title is undefined');
    }
    if (typeof description === 'undefined') {
      throw new Error('Description is undefined');
    }
    if (typeof path === 'undefined') {
      throw new Error('Path is undefined');
    }
    if (typeof thumbnail === 'undefined') {
      throw new Error('Thumbnail is undefined');
    }
    if (typeof userId === 'undefined') {
      throw new Error('UserID is undefined');
    }

    var [insertResult, _] = await db.execute(`INSERT INTO posts (title, description, video, thumbnail, fk_userId) VALUE (?,?,?,?,?);`,
    [title, description, path, thumbnail, userId]
    );
    if(insertResult && insertResult.affectedRows == 1){
      req.flash("success", "Your post was created!");
      return req.session.save(function(error){
        if(error) next(error);
        return res.redirect(`/`);
      })
    } else {
      next(new Error('Post could not be created'));
    }
  } catch (error) {
    next(error);
  }
});

//view post take an id
router.get("/:id(\\d+)", function(req,res){
  res.render('viewpost', { 
     title: `Viewpost ${req.params.id}`,
     css: ["style.css"]
   });
});

router.get("/search", async function (req, res, next){
      // console.log(req.query);
      var {searchValue} = req.query;
      try {
        var [rows, _] = await db.execute(
          `SELECT id,title,thumbnail, concat_ws(' ', title, description) AS haystack
          FROM posts
          HAVING haystack LIKE ?;`,
          [`%${searchValue}%`]
        );

        if(rows && rows.length == 0){

        } else {
          res.locals.posts = rows;
          return res.render('index');
        }

      } catch (error) {
        next(error);
      }
      // res.end();
});


router.delete("/delete",  function (req, res , next){

});


module.exports = router;