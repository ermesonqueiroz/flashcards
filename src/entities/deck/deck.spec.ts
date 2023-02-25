import { left } from '@common/either'
import { InvalidTitleError } from '@entities/errors/deck/invalid-title'
import { describe, expect, it } from 'vitest'
import { Deck } from './deck'

describe('Deck domain entity', () => {
  it('should create deck', () => {
    const deck = Deck.create({
      title: 'My deck',
      cards: []
    })

    expect(deck.isRight()).toBeTruthy()
  })

  it('should not create deck with blank title', () => {
    const title = '      '

    const deck = Deck.create({
      title,
      cards: []
    })

    expect(deck).toEqual(left(new InvalidTitleError(title)))
  })
})
