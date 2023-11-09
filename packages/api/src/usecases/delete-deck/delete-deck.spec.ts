import { InMemoryDecksRepository } from '@/repositories/in-memory'
import { DeleteDeckUseCase } from './delete-deck'
import { type DeckData } from '@/entities/deck'
import { CannotFindDeckError } from '../errors/cannot-find-deck'

function makeSut (decks?: DeckData[]) {
  const decksRepository = new InMemoryDecksRepository(decks ?? [])
  const sut = new DeleteDeckUseCase(decksRepository)

  return { sut }
}

describe('Delete deck use case', () => {
  it('should delete deck by id', async () => {
    const deckData = {
      id: 'deck_01',
      title: 'Deck to delete'
    }

    const { sut } = makeSut([deckData])
    const deckOrError = await sut.execute({ id: deckData.id })

    expect(deckOrError.isRight()).toBeTruthy()
    expect(deckOrError.value).toEqual(deckData)
  })

  it('should not delete deck non existent deck', async () => {
    const { sut } = makeSut()
    const deckOrError = await sut.execute({ id: 'fake_id' })

    expect(deckOrError.isLeft()).toBeTruthy()
    expect(deckOrError.value).toBeInstanceOf(CannotFindDeckError)
  })
})
