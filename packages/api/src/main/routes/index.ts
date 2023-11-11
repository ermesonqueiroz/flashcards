import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateDeckController } from '../factories/make-create-deck-controller'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ message: 'Hello, World!' })
})

router.post('/decks', adaptRoute(makeCreateDeckController()))

export default router
