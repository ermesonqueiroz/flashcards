import { left } from '@common/either'
import { InvalidTitleError } from '@entities/errors/deck'
import { InMemoryDecksRepository } from '@repositories/in-memory'
import { describe, expect, it } from 'vitest'
import { CreateDeckUseCase } from './create-deck'

describe('Create deck use case', () => {
  it('should create deck', async () => {
    const decksRepository = new InMemoryDecksRepository([])
    const createCardUseCase = new CreateDeckUseCase(decksRepository)

    const response = await createCardUseCase.execute({
      title: 'Foo',
      cards: []
    })

    expect(response.isRight()).toBeTruthy()
  })

  it('should not create deck with blank title', async () => {
    const cardsRepository = new InMemoryDecksRepository([])
    const createCardUseCase = new CreateDeckUseCase(cardsRepository)

    const title = '      '
    const response = await createCardUseCase.execute({
      title,
      cards: []
    })

    expect(response).toEqual(left(new InvalidTitleError(title)))
  })

  it('should create deck without blank spaces in title', async () => {
    const cardsRepository = new InMemoryDecksRepository([])
    const createCardUseCase = new CreateDeckUseCase(cardsRepository)

    const title = '   Foo   !'
    const response = await createCardUseCase.execute({
      title,
      cards: []
    })

    const expectedTitle = 'Foo !'

    expect(response.isRight()).toBeTruthy()
    expect(response.value).property('title').equal(expectedTitle)
  })
})
