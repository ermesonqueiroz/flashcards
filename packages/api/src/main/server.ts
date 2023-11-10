import app from './config/app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$connect()
  .then(() => {
    app.listen(3333, () => {
      console.log('Server is running on 127.0.0.1:3333')
    })
  })
  .catch(console.error)
