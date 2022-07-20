import { Item } from '../models/item.js'
import {Post} from '../models/post.js'
import { v2 as cloudinary } from 'cloudinary'
import { Profile } from '../models/profile.js'
import { Restaurant } from '../models/restaurant.js'

function create(req, res) {
  req.body.author = req.user.profile
  console.log(req.body)
    Restaurant.create(req.body)
    .then(restaurant => {
      Restaurant.findById(restaurant._id)
      .then(populatedRestaurant => {
        Item.create(req.body)
        .then(item => {
          Item.findById(item._id)
          .then(item => {
            req.body.restaurant = populatedRestaurant
            req.body.item = item
            Post.create(req.body)
            .then(post => {
              Post.findById(post._id)
              .populate('author')
              .then(populatedPost => {
                res.json(populatedPost)
              })
            })
          })
        })
      })
    })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res) {
    Post.find({})
    .populate('author')
    .populate('restaurant')
    .populate('item')
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: err.errmsg})
      })

}

function deletePost(req, res){
  Post.findByIdAndDelete(req.params.id)
  .then(deletedPost => {
    res.json(deletedPost)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('author')
    .then(updatedPost => {
      res.json(updatedPost)
    })
    .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Post.findById(req.params.id)
  .then(post => {
    console.log(post)
    cloudinary.uploader.upload(imageFile, {tags: `${post.review}`})
    .then(image => {
      post.photo = image.url
      post.save()
      .then(post => {
        res.status(201).json(post.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

function show(req, res) {
  Post.findById(req.params.id)
  .populate('author')
  .populate('restaurant')
  .populate('item')
  .then(post => res.json(post))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function createComment(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    Profile.findById(req.user.profile)
    .then(profile => {
      req.body.author = profile.name
      post.comments.push(req.body)
      post.save()
      .then(updatedPost => res.json(updatedPost))
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export {
    create,
    index,
    deletePost as delete,
    update,
    addPhoto,
    show,
    createComment
}