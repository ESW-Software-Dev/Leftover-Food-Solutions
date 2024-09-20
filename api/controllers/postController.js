
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Post = require('../models/post');

// Handle Category create on POST.
exports.upload_post = [
  // Validate and sanitize the name field.
  body("name", "Item name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    console.log("uploading category")
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Go back to home page
      console.error('Errors:', errors);
      res.status(500).json({ success: false, error: 'Failed to add item' });
    }


    // Create a Post object with escaped and trimmed data.
    const post = new Post({
      name: req.body.name,
      location: req.body.location,
      foodType: req.body.foodType,
      images: req.body.images,
      availability: req.body.availability
    });

    // Check if Post with same name already exists.
    const postExists = await Post.findOne({ name: req.body.name })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (postExists) {
      // Post exists, redirect to its detail page.
      res.status(500).json({ success: false, error: 'Post already exists' });
    } else {

      // Save the new Post and redirect to its detail page.
      await post.save();

      console.log("uploaded category");
      // Send the generated URL back to the client
      res.status(200).json({ success: true, url: post.url });
    }
  }),
];

// Read a single post by ID
exports.read_post_id = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve post' });
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
        return res.status(404).json({ success: false, error: 'Item not found' });
      }

      // Update the selected post with new data
      post.name = req.body.name;
      await post.save();

      // Return success status code
      res.status(200).json({ success: true, url: post.url });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ success: false, error: 'Failed to update item' });
    }
  }),
];

// Handle Post delete on DELETE
exports.delete_post = asyncHandler(async (req, res, next) => {
  console.log("Post delete");
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Item not found');
    }
    // Delete the item from the database
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send({ success: false });
  }
});

