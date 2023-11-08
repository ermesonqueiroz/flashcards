import { left } from '@/common/either'
import { InvalidDefinitionError, InvalidTermError } from '@/entities/errors/card'
import { InMemoryCardsRepository } from '@/repositories/in-memory/cards-repository'
import { CreateCardUseCase } from './create-card'

describe('Create card use case', () => {
  it('Should create card', async () => {
    const cardsRepository = new InMemoryCardsRepository([])
    const createCardUseCase = new CreateCardUseCase(cardsRepository)

    const response = await createCardUseCase.execute({
      deckId: 'DECK-ID',
      term: 'Foo',
      definition: 'Bar'
    })

    expect(response.isRight()).toBeTruthy()
  })

  it('should not create card with blank term', async () => {
    const cardsRepository = new InMemoryCardsRepository([])

    const createCardUseCase = new CreateCardUseCase(cardsRepository)

    const term = '      '
    const response = await createCardUseCase.execute({
      deckId: 'DECK-ID',
      term,
      definition: 'Bar'
    })

    expect(response).toEqual(left(new InvalidTermError(term)))
  })

  it('should create card without blank spaces in term', async () => {
    const cardsRepository = new InMemoryCardsRepository([])

    const createCardUseCase = new CreateCardUseCase(cardsRepository)

    const term = '   Foo   !'
    const response = await createCardUseCase.execute({
      deckId: 'DECK-ID',
      term,
      definition: 'Bar'
    })

    const expectedTerm = 'Foo !'
    const expectedCard = await createCardUseCase.execute({
      deckId: 'DECK-ID',
      term: expectedTerm,
      definition: 'Bar'
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expectedCard.value)
  })

  it('should not create card with blank definition', async () => {
    const cardsRepository = new InMemoryCardsRepository([])

    const createCardUseCase = new CreateCardUseCase(cardsRepository)

    const definition = '      '
    const card = await createCardUseCase.execute({
      deckId: 'DECK-ID',
      term: 'Foo',
      definition
    })

    expect(card).toEqual(left(new InvalidDefinitionError(definition)))
  })
})
