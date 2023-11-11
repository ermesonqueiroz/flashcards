import { type ICreateDeckUseCase } from '@/usecases/create-deck/create-deck'
import { CreateDeckController } from './create-deck'
import { UuidServiceStub } from '@/usecases/__mocks__/uuid-service'
import { type CreateDeckRequest } from '@/usecases/create-deck/create-deck-request'
import { type CreateDeckResponse } from '@/usecases/create-deck/create-deck-response'
import { left, right } from '@/common/either'
import { MissingParamError, ServerError } from './errors'
import { InvalidTitleError } from '@/entities/errors/deck'

afterEach(() => {
  jest.restoreAllMocks()
})

function makeCreateDeckUseCaseStub () {
  class CreateDeckUseCaseStub implements ICreateDeckUseCase {
    public async execute (createDeckRequest: CreateDeckRequest): Promise<CreateDeckResponse> {
      return await Promise.resolve(right(createDeckRequest))
    }
  }

  return new CreateDeckUseCaseStub()
}

function makeSut () {
  const uuidServiceStub = new UuidServiceStub()
  const createDeckUseCaseStub = makeCreateDeckUseCaseStub()
  const sut = new CreateDeckController(createDeckUseCaseStub, uuidServiceStub)

  return {
    sut,
    createDeckUseCaseStub,
    uuidServiceStub
  }
}

describe('Create deck controller', () => {
  it('should call CreateDeckUseCase with correct values and return 200', async () => {
    const { sut, createDeckUseCaseStub, uuidServiceStub } = makeSut()
    const uuidServiceSpy = jest.spyOn(uuidServiceStub, 'generate')
    const createDeckSpy = jest.spyOn(createDeckUseCaseStub, 'execute')

    uuidServiceStub.generate.mockReturnValue('id')

    const { statusCode } = await sut.handle({
      body: {
        title: 'Deck title'
      }
    })

    expect(uuidServiceSpy).toHaveBeenCalled()
    expect(createDeckSpy).toHaveBeenCalledWith({
      id: 'id',
      title: 'Deck title'
    })
    expect(statusCode).toEqual(200)
  })

  it('should call CreateDeckUseCase if a title with blank spaces is provided and return 200', async () => {
    const { sut, uuidServiceStub, createDeckUseCaseStub } = makeSut()
    const uuidServiceSpy = jest.spyOn(uuidServiceStub, 'generate')
    const createDeckSpy = jest.spyOn(createDeckUseCaseStub, 'execute')

    uuidServiceStub.generate.mockReturnValue('id')
    createDeckSpy.mockImplementationOnce(async ({ id }: CreateDeckRequest) => {
      return await Promise.resolve(right({
        id,
        title: 'Should trim the title'
      }))
    })

    const { statusCode } = await sut.handle({
      body: {
        title: '    Should trim the title    '
      }
    })

    expect(uuidServiceSpy).toHaveBeenCalled()
    expect(createDeckSpy).toHaveBeenCalled()
    expect(statusCode).toEqual(200)
  })

  it('should return 400 if no title is provided', async () => {
    const { sut, createDeckUseCaseStub, uuidServiceStub } = makeSut()
    const uuidServiceSpy = jest.spyOn(uuidServiceStub, 'generate')
    const createDeckSpy = jest.spyOn(createDeckUseCaseStub, 'execute')

    const { statusCode, body } = await sut.handle({
      body: {}
    })

    expect(uuidServiceSpy).not.toHaveBeenCalled()
    expect(createDeckSpy).not.toHaveBeenCalled()
    expect(statusCode).toEqual(400)
    expect(body).toEqual(new MissingParamError('title'))
  })

  it('should return 400 if a blank title is provided', async () => {
    const { sut, createDeckUseCaseStub, uuidServiceStub } = makeSut()
    const uuidServiceSpy = jest.spyOn(uuidServiceStub, 'generate')
    const createDeckSpy = jest.spyOn(createDeckUseCaseStub, 'execute')

    uuidServiceStub.generate.mockReturnValue('id')
    createDeckSpy.mockImplementationOnce(async (createDeckRequest: CreateDeckRequest) => {
      return await Promise.resolve(left(new InvalidTitleError('   ')))
    })

    const { statusCode, body } = await sut.handle({
      body: {
        title: '   '
      }
    })

    expect(uuidServiceSpy).toHaveBeenCalled()
    expect(createDeckSpy).toHaveBeenCalled()
    expect(statusCode).toEqual(400)
    expect(body).toEqual(new InvalidTitleError('   '))
  })

  it('should return 500 if CreateDeckUseCase throws', async () => {
    const { sut, createDeckUseCaseStub, uuidServiceStub } = makeSut()
    const uuidServiceSpy = jest.spyOn(uuidServiceStub, 'generate')
    const createDeckSpy = jest.spyOn(createDeckUseCaseStub, 'execute')

    uuidServiceStub.generate.mockReturnValue('id')
    createDeckSpy.mockImplementationOnce(async (createDeckRequest: CreateDeckRequest) => {
      throw new Error()
    })

    const { statusCode, body } = await sut.handle({
      body: {
        title: 'Deck Title'
      }
    })

    expect(uuidServiceSpy).toHaveBeenCalled()
    expect(createDeckSpy).toHaveBeenCalled()
    expect(statusCode).toEqual(500)
    expect(body).toEqual(new ServerError('internal'))
  })
})
