import { type Either, right, left } from '@/common/either'
import { Id } from '@/entities/common/id'
import { InvalidTitleError } from '@/entities/errors/deck'
import { InvalidIdError } from '@/entities/errors/id'
import { type DeckData } from './deck-data'
import { Title } from './title'

export class Deck {
  public readonly id: Id
  public readonly title: Title

  private constructor (id: Id, title: Title) {
    this.id = id
    this.title = title
  }

  public static create ({ id, title }: DeckData): Either<InvalidTitleError, Deck> {
    const idOrError = Id.create(id)
    const titleOrError = Title.create(title)

    if (idOrError.isLeft()) return left(new InvalidIdError(id))
    if (titleOrError.isLeft()) return left(new InvalidTitleError(title))

    return right(new Deck(idOrError.value, titleOrError.value))
  }
}
