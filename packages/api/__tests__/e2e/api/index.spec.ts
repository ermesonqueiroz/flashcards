import superTest from 'supertest'
import app from '@/main/config/app'

describe('API E2E Test Suite', () => {
  test('GET /api - should return "Hello World"', async () => {
    const response = await superTest(app)
      .get('/api')

    expect(response.ok).toBeTruthy()
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('Hello, World!')
  })
})
