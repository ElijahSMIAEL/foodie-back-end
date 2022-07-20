import { Profile } from '../models/profile.js'

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

export { 
  index, 
  show,
  update, 
}
