import { type Express } from 'express'
import { bodyParser, contentType, cors } from '../middlewares'

export default (app: Express) => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}