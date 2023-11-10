import { type Express } from 'express'
import routes from '../routes'

export default (app: Express) => app.use('/api', routes)
