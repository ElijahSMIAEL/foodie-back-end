import axios from 'axios'
import { config } from 'dotenv'
import { response } from 'express'
import { Profile } from '../models/profile.js'
import { Restaurant } from '../models/restaurant.js'

const apiKey = `${process.env.API_KEY}`
const apiBaseUrl = 'https://api.yelp.com/v3/businesses'

function search(req, res) {
  axios.get(`${apiBaseUrl}/search?term=${userInput}&location=${userlocation}&categories=food`, {
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
    }, config)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}


export {
  search
}