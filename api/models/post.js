const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    room_url: {type: String},
})

PostSchema.virtual("url").get(function() {
    return `/${this._id}`;
});

module.exports = mongoose.model("Room", PostSchema);