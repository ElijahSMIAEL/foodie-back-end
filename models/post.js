import mongoose from "mongoose";

const Schema = mongoose.Schema

const postSchema = new Schema({
  comment: {type: String, required: true},
  foodBeverage: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  restaurant: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  replies: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  item: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  photo: String,
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}