import mongoose from "mongoose";

const Schema = mongoose.Schema

const itemSchema = new Schema({
  title: {type: String, required: true},
  price: Number
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export {
  Item
}