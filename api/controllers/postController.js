const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Post = require("../models/post");
const User = require("../models/user");
const cloudinary = require("../config/cloudinaryConfig");
// Handle Category create on POST.

exports.upload_post = [
  asyncHandler(async (req, res, next) => {
    console.log("Uploading post");

    let imgURL = "";
    if (req.file) {
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          ).end(req.file.buffer);
        });
        imgURL = result.secure_url;
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res
          .status(500)
          .json({ success: false, message: "Error uploading image" });
      }
    }

    const userId = req.body.user;

    const post = new Post({
      name: req.body.name,
      organization: req.body.organization,
      location: req.body.location,
      foodType: req.body.foodType,
      description: req.body.description,
      duration: req.body.duration, // should be a number in milliseconds already
      availability: req.body.availability === 'true' || req.body.availability === true, // ensure boolean
      imageURL: imgURL,
      user: userId,
    });

    try {
      await post.save();
      console.log('Post saved:', post);

      // Link the post to the user
      const user = await User.findById(userId).exec();
      if (user) {
        user.posts.push(post._id);
        await user.save();
      }

      console.log("Uploaded post successfully");

      // Send back the created post object
      res.status(200).json({ success: true, post });
    } catch (err) {
      console.error("Error saving post:", err);
      res.status(500).json({ success: false, message: "Error saving post" });
    }
  }),
];



// get all posts
exports.get_posts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find(); // Use plural to indicate multiple posts
    posts.map((post) => {
      console.log(post.imageURL);
    });
    if (posts.length === 0) {
      return res.status(404).json({ success: false, error: "No posts found" });
    }

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve posts" });
  }
});

exports.get_posts_by_user = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id; // Extract userId from request parameters

    console.log(`Fetching posts for user ID: ${userId}`);

    // Find posts where user_id matches the provided userId
    const posts = await Post.find({ user: userId });

    // Log each post's image URL (if necessary for debugging)
    posts.forEach((post) => {
      console.log(post.imageURL);
    });

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No posts found for this user" });
    }

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve posts" });
  }
});

exports.get_posts_saved_by_user = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    user.saved.forEach((post) => {
      console.log(post.imageURL);
    });

    const posts = await Post.find({ _id: { $in: user.saved } });

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No saved posts found for this user" });
    }

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching user's saved posts:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve user's saved posts" });
  }
});

exports.get_posts_claimed_by_user = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    user.claimed.forEach((post) => {
      console.log(post.imageURL);
    });

    const posts = await Post.find({ _id: { $in: user.claimed } });

    if (posts.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No saved posts found for this user" });
    }

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching user's saved posts:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve user's saved posts" });
  }
});

// Read a single post by ID
exports.read_post_id = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve post" });
  }
});

// Handle Post update on UPDATE
exports.update_post = [
  body("name", "Item name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Send possible to the client.
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Find a post by ID
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res
          .status(404)
          .json({ success: false, error: "Item not found" });
      }

      // Update the selected post with new data
      post.name = req.body.name;
      await post.save();

      // Return success status code
      res.status(200).json({ success: true, url: post.url });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ success: false, error: "Failed to update item" });
    }
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  console.log("Post delete");
  console.log(req.params.id);

  try {
    const postId = req.params.id;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .send({ success: false, message: "Post not found" });
    }

    // Find the user
    const user = await User.findById(post.user);
    if (user) {
      // Remove postId from user's posts array
      user.posts = user.posts.filter(
        (id) => id.toString() !== postId.toString()
      );
      await user.save(); // Save the updated user
    }

    // Delete the post
    const deletedPost = await Post.findByIdAndDelete(postId);

    res.status(200).send({ success: true, data: deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send({ success: false, error: "Failed to delete post" });
  }
});
