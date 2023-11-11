import request from 'supertest'
import app from '@/main/config/app'
import { PrismaHelper } from '@/external/repositories/prisma'

beforeEach(async () => {
  await PrismaHelper.client.deck.createMany({
    data: [
      {
        id: 'DECK_01',
        title: 'Deck 01'
      },
      {
        id: 'DECK_02',
        title: 'Deck 02'
      },
      {
        id: 'DECK_03',
        title: 'Deck 03'
      }
    ]
  })
})

afterEach(async () => {
  await PrismaHelper.client.deck.deleteMany()
})

afterAll(async () => {
  await PrismaHelper.client.$disconnect()
})

describe('GET /api/decks', () => {
  it('should return all decks', async () => {
    const response = await request(app)
      .get('/api/decks')

    expect(response.ok).toBeTruthy()
    expect(response.body).toHaveLength(3)
  })
})
