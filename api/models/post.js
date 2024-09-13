const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    location: {type: String},
    date: {type: Date},
    time: {type: TimeRanges},
    updated: {type: Date, default: Date.now()},
    images: {imgurl: {type: String}},
    availability: {type: Boolean}
})

PostSchema.virtual("url").get(function() {
    return `/${this._id}`;
});

module.exports = mongoose.model("PostModel", PostSchema);