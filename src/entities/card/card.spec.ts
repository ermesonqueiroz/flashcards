import { describe, it, expect } from 'vitest'
import { left } from '@common/either'
import { Card } from './card'
import { InvalidTermError, InvalidDefinitionError } from '@entities/errors/card'
import { randomUUID } from 'crypto'

describe('Card domain entity', () => {
  it('should create card', () => {
    const card = Card.create({
      id: randomUUID(),
      term: 'Foo',
      definition: 'Bar'
    })

    expect(card.isRight()).toBeTruthy()
  })

  it('should not create card with blank term', () => {
    const term = '      '
    const card = Card.create({
      id: randomUUID(),
      term,
      definition: 'Bar'
    })

    expect(card).toEqual(left(new InvalidTermError(term)))
  })

  it('should create card without blank spaces in term', () => {
    const id = randomUUID()
    const term = '   Foo   !'
    const card = Card.create({
      id,
      term,
      definition: 'Bar'
    })

    const expectedTerm = 'Foo !'
    const expectedCard = Card.create({
      id,
      term: expectedTerm,
      definition: 'Bar'
    })

    expect(card.isRight()).toBeTruthy()
    expect(card.value).toEqual(expectedCard.value)
  })

  it('should not create card with blank definition', () => {
    const definition = '      '
    const card = Card.create({
      id: randomUUID(),
      term: 'Foo',
      definition
    })

    expect(card).toEqual(left(new InvalidDefinitionError(definition)))
  })
})
