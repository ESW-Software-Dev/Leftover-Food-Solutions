const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    



    
})

PostSchema.virtual("url").get(function() {
    return `/${this._id}`;
});

module.exports = mongoose.model("PostModel", PostSchema);