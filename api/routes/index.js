var express = require('express');
var router = express.Router();

const post_controller = require("../controllers/postController");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/testAPI", function(req, res, next) {
  res.send("API is working properly :)");
});

// POST ROUTES 

//get all posts
router.get('/get-all-posts', post_controller.get_posts);
// upload
router.post('/upload-post', post_controller.upload_post);
// delete
router.delete('/delete-post', post_controller.delete_post);

module.exports = router;
