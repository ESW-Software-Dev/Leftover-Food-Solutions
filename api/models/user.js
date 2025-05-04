const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  profilePicture: { type: String },
  saved: [{ type: Schema.Types.ObjectId, ref: "PostModel" }],
  claimed: [{ type: Schema.Types.ObjectId, ref: "PostModel" }],
  dateCreated: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  posts: [{ type: Schema.Types.ObjectId, ref: "PostModel" }],
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
