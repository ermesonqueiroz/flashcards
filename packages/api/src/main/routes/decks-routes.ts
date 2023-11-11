import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeCreateDeckController } from '@/main/factories/make-create-deck-controller'
import { makeListDecksController } from '../factories/make-list-decks-controller'

const router = Router()

router.get('/', adaptRoute(makeListDecksController()))
router.post('/', adaptRoute(makeCreateDeckController()))

export default router
