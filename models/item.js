import mongoose from "mongoose";

const Schema = mongoose.Schema

const itemSchema = new Schema({
  itemTitle: {type: String, required: true},
  itemPrice: String
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export {
  Item
}