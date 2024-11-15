var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const post_controller = require("../controllers/postController");
const user_controller = require("../controllers/userController");
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
router.post('/upload-post', upload.single('image'), post_controller.upload_post);
// delete
router.delete('/delete-post/:id', post_controller.delete_post);

// USER ROUTES
router.post('/create-user', user_controller.create_user);
router.get('/user/:id', user_controller.get_user);
router.put('/update-user/:id', user_controller.update_user);

module.exports = router;
