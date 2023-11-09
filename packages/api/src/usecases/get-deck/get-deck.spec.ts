import { InMemoryDecksRepository } from '@/repositories/in-memory'
import { GetDeckUseCase } from './get-deck'
import { type DeckData } from '@/entities/deck'
import { CannotFindDeckError } from '../errors/cannot-find-deck'

function makeSut (decks?: DeckData[]) {
  const decksRepository = new InMemoryDecksRepository(decks ?? [])
  const sut = new GetDeckUseCase(decksRepository)

  return { sut }
}

describe('Get deck use case', () => {
  it('should be find deck by id', async () => {
    const deckData = {
      id: 'deck_01',
      title: 'Deck to search'
    }

    const { sut } = makeSut([deckData])
    const response = await sut.execute({ id: deckData.id })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(deckData)
  })

  it('should not be find non existent deck', async () => {
    const { sut } = makeSut([])
    const response = await sut.execute({ id: 'deck_01' })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(CannotFindDeckError)
  })
})
