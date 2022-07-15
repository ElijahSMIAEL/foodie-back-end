import mongoose from "mongoose";

const Schema = mongoose.Schema

const replySchema = new Schema({
  description: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Reply = mongoose.model('Reply', replySchema)

export {
  Reply
}