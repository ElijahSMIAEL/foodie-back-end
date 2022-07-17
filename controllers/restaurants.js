import axios from 'axios'
import { config } from 'dotenv'
import { response } from 'express'
import { Profile } from '../models/profile.js'
import { Restaurant } from '../models/restaurant.js'

const apiKey = `${process.env.API_KEY}`
const apiBaseUrl = 'https://api.yelp.com/v3/businesses'

function search(req, res) {
  console.log('test')
  axios.get(`${apiBaseUrl}/search?term=$${req.params.query}&location=$${req.params.location}&categories=food`, {
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
    }, config)
    .then((result) => {
      console.log(result)
      console.log(result.data)
      res.json({result: result.data})
    })
    .catch((err) => {
      console.log(err)
    })
}


export {
  search
}