import { type ListDecks } from '@/usecases/list-decks/list-decks'
import { type ListDecksResponse } from '@/usecases/list-decks/list-decks-response'
import { ListDecksController } from './list-decks'
import { ServerError } from './errors'

afterEach(() => {
  jest.restoreAllMocks()
})

function makeListDecksStub () {
  class ListDecksUseCaseStub implements ListDecks {
    public async execute (): Promise<ListDecksResponse> {
      return await Promise.resolve([])
    }
  }

  return new ListDecksUseCaseStub()
}

function makeSut () {
  const listDeckStub = makeListDecksStub()
  const sut = new ListDecksController(listDeckStub)

  return {
    sut,
    listDeckStub
  }
}

describe('List decks use case', () => {
  it('should return all decks', async () => {
    const { sut, listDeckStub } = makeSut()
    const listDecksSpy = jest.spyOn(listDeckStub, 'execute')

    const response = await sut.handle({})

    expect(listDecksSpy).toHaveBeenCalled()
    expect(response.statusCode).toEqual(200)
  })

  it('should return 500 if list decks throws', async () => {
    const { sut, listDeckStub } = makeSut()
    const listDecksSpy = jest.spyOn(listDeckStub, 'execute')

    listDecksSpy.mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await sut.handle({})

    expect(listDecksSpy).toHaveBeenCalled()
    expect(response.statusCode).toEqual(500)
    expect(response.body).toEqual(new ServerError('internal'))
  })
})
