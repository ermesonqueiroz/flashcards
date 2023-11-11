import request from 'supertest'
import app from '@/main/config/app'
import { PrismaHelper } from '@/external/repositories/prisma'

afterEach(async () => {
  await PrismaHelper.client.deck.deleteMany()
})

afterAll(async () => {
  await PrismaHelper.client.$disconnect()
})

describe('POST /api/decks', () => {
  it('should return 200 if a valid title is provided', async () => {
    const response = await request(app)
      .post('/api/decks')
      .send({ title: 'Other Title' })

    expect(response.ok).toBeTruthy()
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('title')
  })

  it.todo('should return 400 if a duplicated title is provided')
})
