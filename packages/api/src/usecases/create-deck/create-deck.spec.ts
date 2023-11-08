import { left } from '@/common/either'
import { InvalidTitleError } from '@/entities/errors/deck'
import { InMemoryDecksRepository } from '@/repositories/in-memory'
import { CreateDeckUseCase } from './create-deck'
import { UuidServiceStub } from '../__mocks__/uuid-service'

afterEach(() => {
  jest.restoreAllMocks()
})

function makeSut () {
  const uuidServiceStub = new UuidServiceStub()
  const decksRepository = new InMemoryDecksRepository([])
  const sut = new CreateDeckUseCase(decksRepository, uuidServiceStub)

  return { uuidServiceStub, sut }
}

describe('Create deck use case', () => {
  it('should create deck', async () => {
    const { sut, uuidServiceStub } = makeSut()
    uuidServiceStub.generate.mockReturnValue('id')

    const response = await sut.execute({
      title: 'Foo'
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      id: 'id',
      title: 'Foo'
    })
  })

  it('should not create deck with blank title', async () => {
    const { sut, uuidServiceStub } = makeSut()
    uuidServiceStub.generate.mockReturnValue('id')

    const title = '      '
    const response = await sut.execute({
      title
    })

    expect(response).toEqual(left(new InvalidTitleError(title)))
  })

  it('should create deck without blank spaces in title', async () => {
    const { sut, uuidServiceStub } = makeSut()
    uuidServiceStub.generate.mockReturnValue('id')

    const response = await sut.execute({
      title: '   Foo   !'
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      id: 'id',
      title: 'Foo !'
    })
  })
})
