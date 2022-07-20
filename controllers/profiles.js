import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => res.json(profile))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function update(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.name = req.body.name
    profile.bio = req.body.bio
    profile.save()
    .then(updatedProfile => res.json(updatedProfile))
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${profile.avatar}`})
    .then(image => {
      profile.profilePhoto = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.profilePhoto)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export { 
  index, 
  show,
  update,
  addPhoto, 
}
