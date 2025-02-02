const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: {type: String, maxLength: 100},
    organization: {type: String, maxLength: 100},
    location: {type: String},
    date: {type: Date, default: new Date()},
    foodType: {type: String},
    updated: {type: Date, default: new Date()},
    imageURL: {type: String},
    availability: {type: Boolean},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

PostSchema.virtual("url").get(function() {
    return `/${this._id}`;
});

module.exports = mongoose.model("PostModel", PostSchema);