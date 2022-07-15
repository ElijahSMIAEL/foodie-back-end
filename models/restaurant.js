import mongoose from "mongoose";

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  title: {type: String, required: true},
  category: String,
  photo: String,
}, {
  timestamps: true
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export {
  Restaurant
}