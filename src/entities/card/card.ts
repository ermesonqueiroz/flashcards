import { type CardData } from './card-data'
import { left, right, type Either } from '@common/either'
import { Term } from './term'
import { InvalidTermError } from '@entities/errors'

export class Card {
  public readonly term: Term
  public readonly definition: string

  private constructor (term: Term, definition: string) {
    this.term = term
    this.definition = definition
  }

  public static create ({ term, definition }: CardData): Either<InvalidTermError, Card> {
    const termOrError = Term.create(term)

    if (termOrError.isLeft()) return left(new InvalidTermError(term))

    return right(new Card(
      termOrError.value,
      definition
    ))
  }
}
