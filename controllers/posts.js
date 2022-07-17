import {Post} from '../models/post.js'

function create(req, res) {
  req.body.author = req.user.profile
  Post.create(req.body)
  .then(post => {
    Post.findById(post._id)
    .populate('author')
    .then(populatedPost => {
        res.json(populatedPost)
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


export {
    create,
    index,
    deletePost as delete,
    update
}