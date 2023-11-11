import { InMemoryDecksRepository } from '@/repositories/in-memory'
import { ListDecksUseCase } from './list-decks'
import { type DeckData } from '@/entities/deck'

function makeSut (decks?: DeckData[]) {
  const decksRepository = new InMemoryDecksRepository(decks ?? [])

  const sut = new ListDecksUseCase(decksRepository)

  return { sut }
}

describe('List decks use case', () => {
  it('should be return all decks', async () => {
    const { sut } = makeSut([
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
    ])

    const response = await sut.execute()
    expect(response).toHaveLength(3)
  })

  it('should be return empty list if repository is empty', async () => {
    const { sut } = makeSut()
    const response = await sut.execute()

    expect(response).toHaveLength(0)
  })
})
