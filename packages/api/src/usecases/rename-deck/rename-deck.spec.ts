import { InMemoryDecksRepository } from '@/repositories/in-memory'
import { RenameDeckUseCase } from './rename-deck'
import { type DeckData } from '@/entities/deck'
import { InvalidTitleError } from '@/entities/errors/deck'

function makeSut (decks?: DeckData[]) {
  const decksRepository = new InMemoryDecksRepository(decks ?? [])
  const sut = new RenameDeckUseCase(decksRepository)

  return { sut }
}

describe('Rename deck use case', () => {
  it('should be update deck title', async () => {
    const deckData = {
      id: 'deck_01',
      title: 'Deck to rename'
    }

    const { sut } = makeSut([deckData])

    const response = await sut.execute({
      id: deckData.id,
      title: 'Renamed'
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      id: deckData.id,
      title: 'Renamed'
    })
  })

  it('should be not update non existent deck', () => {
    const { sut } = makeSut()

    sut.execute({
      id: 'deck_01',
      title: 'Deck to rename'
    })
  })

  it('should be not rename an existent deck', async () => {
    const deckData = {
      id: 'deck_01',
      title: 'Deck to rename'
    }

    const { sut } = makeSut([deckData])

    const response = await sut.execute({
      id: deckData.id,
      title: ''
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(InvalidTitleError)
  })
})
