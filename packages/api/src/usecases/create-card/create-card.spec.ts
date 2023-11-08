import { left } from '@/common/either'
import { InvalidDefinitionError, InvalidTermError } from '@/entities/errors/card'
import { InMemoryCardsRepository } from '@/repositories/in-memory/cards-repository'
import { CreateCardUseCase } from './create-card'
import { UuidServiceStub } from '../__mocks__/uuid-service'

afterEach(() => {
  jest.restoreAllMocks()
})

function makeSut () {
  const uuidServiceStub = new UuidServiceStub()
  const cardsRepository = new InMemoryCardsRepository([])
  const sut = new CreateCardUseCase(cardsRepository, uuidServiceStub)

  return { uuidServiceStub, sut }
}

describe('Create card use case', () => {
  it('Should create card', async () => {
    const { sut, uuidServiceStub } = makeSut()
    uuidServiceStub.generate.mockReturnValue('id')

    const response = await sut.execute({
      deckId: 'DECK-ID',
      term: 'Foo',
      definition: 'Bar'
    })

    expect(response.isRight()).toBeTruthy()
  })

  it('should not create card with blank term', async () => {
    const { sut, uuidServiceStub } = makeSut()
    uuidServiceStub.generate.mockReturnValue('id')

    const term = '      '
    const response = await sut.execute({
      deckId: 'DECK-ID',
      term,
      definition: 'Bar'
    })

    expect(response).toEqual(left(new InvalidTermError(term)))
  })

  it('should create card without blank spaces in term', async () => {
    const { sut, uuidServiceStub } = makeSut()
    uuidServiceStub.generate.mockReturnValue('id')

    const term = '   Foo   !'
    const response = await sut.execute({
      deckId: 'DECK-ID',
      term,
      definition: 'Bar'
    })

    uuidServiceStub.generate.mockReturnValue('id')

    const expectedTerm = 'Foo !'
    const expectedCard = await sut.execute({
      deckId: 'DECK-ID',
      term: expectedTerm,
      definition: 'Bar'
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expectedCard.value)
  })

  it('should not create card with blank definition', async () => {
    const { sut, uuidServiceStub } = makeSut()
    uuidServiceStub.generate.mockReturnValue('id')

    const definition = '      '
    const card = await sut.execute({
      deckId: 'DECK-ID',
      term: 'Foo',
      definition
    })

    expect(card).toEqual(left(new InvalidDefinitionError(definition)))
  })
})
