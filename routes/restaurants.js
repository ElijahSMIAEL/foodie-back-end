import { Router } from 'express'
import * as restaurantsCtrl from '../controllers/restaurants.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/search/:query/:location', restaurantsCtrl.search)


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

export { router }
