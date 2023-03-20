import { type CardData } from './card-data'
import { left, right, type Either } from '@common/either'
import { Term } from './term'
import { Definition } from './definition'
import { InvalidDefinitionError, InvalidTermError } from '@entities/errors/card'
import { Id } from '@entities/common/id'
import { InvalidIdError } from '@entities/errors/id'
import { type Difficulty } from '@entities/difficulty/difficulty'

export class Card {
  public readonly id: Id
  public readonly deckId: Id
  public readonly term: Term
  public readonly definition: Definition
  public readonly lastDifficulty?: Difficulty
  public readonly lastView?: Date

  private constructor (
    id: Id,
    deckId: Id,
    term: Term,
    definition: Definition,
    lastDifficulty?: Difficulty,
    lastView?: Date
  ) {
    this.id = id
    this.deckId = deckId
    this.term = term
    this.definition = definition
    this.lastDifficulty = lastDifficulty
    this.lastView = lastView
  }

  public static create ({ id, deckId, term, definition }: CardData): Either<InvalidTermError | InvalidDefinitionError, Card> {
    const idOrError = Id.create(id)
    const deckIdOrError = Id.create(deckId)
    const termOrError = Term.create(term)
    const definitionOrError = Definition.create(definition)

    if (idOrError.isLeft()) return left(new InvalidIdError(id))
    if (deckIdOrError.isLeft()) return left(new InvalidIdError(deckId))
    if (termOrError.isLeft()) return left(new InvalidTermError(term))
    if (definitionOrError.isLeft()) return left(new InvalidDefinitionError(definition))

    return right(new Card(
      idOrError.value,
      deckIdOrError.value,
      termOrError.value,
      definitionOrError.value
    ))
  }
}
