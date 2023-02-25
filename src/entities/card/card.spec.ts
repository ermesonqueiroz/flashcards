import { describe, it, expect } from 'vitest'
import { right } from '@common/either'
import { InvalidTermError } from '@entities/errors'
import { Card } from './card'

describe('Card domain entity', () => {
  it('should create card', () => {
    const card = Card.create({
      term: 'Foo',
      definition: 'Bar'
    })

    expect(card.isRight()).toBeTruthy()
  })

  it('should not create card with blank term', () => {
    const term = '      '
    const card = Card.create({
      term,
      definition: 'Bar'
    })

    expect(card).toEqual(right(new InvalidTermError(term)))
  })

  it('should create card without blank spaces in term', () => {
    const term = '   Foo   !'
    const card = Card.create({
      term,
      definition: 'Bar'
    })

    const expectedTerm = 'Foo !'
    const expectedCard = Card.create({
      term: expectedTerm,
      definition: 'Bar'
    })

    expect(card.isRight()).toBeTruthy()
    expect(card.value).toEqual(expectedCard.value)
  })
})
