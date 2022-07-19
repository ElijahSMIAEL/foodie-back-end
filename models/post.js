import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema({
  comment: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const postSchema = new Schema({
  review: {type: String, required: true}, 
  foodBeverage: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  restaurant: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
  comments: [commentSchema],
  item: {type: mongoose.Schema.Types.ObjectId, ref: "Item"},
  photo: String,
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}