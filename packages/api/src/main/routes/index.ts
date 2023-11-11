import { Router } from 'express'
import decksRoutes from './decks-routes'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Hello, World!' })
})

router.use('/decks', decksRoutes)

export default router
