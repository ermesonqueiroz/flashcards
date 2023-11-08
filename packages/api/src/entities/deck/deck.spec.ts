import { left } from '@/common/either'
import { InvalidTitleError } from '@/entities/errors/deck/invalid-title'
import { randomUUID } from 'crypto'
import { Deck } from './deck'

describe('Deck domain entity', () => {
  it('should create deck', () => {
    const deck = Deck.create({
      id: randomUUID(),
      title: 'My deck'
    })

    expect(deck.isRight()).toBeTruthy()
  })

  it('should not create deck with blank title', () => {
    const title = '      '

    const deck = Deck.create({
      id: randomUUID(),
      title
    })

    expect(deck).toEqual(left(new InvalidTitleError(title)))
  })
})
