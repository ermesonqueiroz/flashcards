import { type CardData } from './card-data'
import { left, right, type Either } from '@common/either'
import { Term } from './term'
import { Definition } from './definition'
import { InvalidDefinitionError, InvalidTermError } from '@entities/errors'

export class Card {
  public readonly term: Term
  public readonly definition: Definition

  private constructor (term: Term, definition: Definition) {
    this.term = term
    this.definition = definition
  }

  public static create ({ term, definition }: CardData): Either<InvalidTermError | InvalidDefinitionError, Card> {
    const termOrError = Term.create(term)
    const definitionOrError = Definition.create(definition)

    if (termOrError.isLeft()) return left(new InvalidTermError(term))
    if (definitionOrError.isLeft()) return left(new InvalidDefinitionError(definition))

    return right(new Card(
      termOrError.value,
      definitionOrError.value
    ))
  }
}
