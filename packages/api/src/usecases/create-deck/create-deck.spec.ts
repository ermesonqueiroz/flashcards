import { left } from '@/common/either'
import { InvalidTitleError } from '@/entities/errors/deck'
import { InMemoryDecksRepository } from '@/repositories/in-memory'
import { CreateDeckUseCase } from './create-deck'

afterEach(() => {
  jest.restoreAllMocks()
})

function makeSut () {
  const decksRepository = new InMemoryDecksRepository([])
  const sut = new CreateDeckUseCase(decksRepository)

  return { sut }
}

describe('Create deck use case', () => {
  it('should create deck', async () => {
    const { sut } = makeSut()

    const response = await sut.execute({
      id: 'id',
      title: 'Foo'
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      id: 'id',
      title: 'Foo'
    })
  })

  it('should not create deck with blank title', async () => {
    const { sut } = makeSut()

    const title = '      '
    const response = await sut.execute({
      id: 'id',
      title
    })

    expect(response).toEqual(left(new InvalidTitleError(title)))
  })

  it('should create deck without blank spaces in title', async () => {
    const { sut } = makeSut()

    const response = await sut.execute({
      id: 'id',
      title: '   Foo   !'
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      id: 'id',
      title: 'Foo !'
    })
  })
})
