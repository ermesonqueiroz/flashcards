import { type Either, right, left } from '@common/either'
import { type CardData } from '@entities/card'
import { Id } from '@entities/common/id'
import { InvalidTitleError } from '@entities/errors/deck'
import { InvalidIdError } from '@entities/errors/id'
import { type DeckData } from './deck-data'
import { Title } from './title'

export class Deck {
  public readonly id: Id
  public readonly title: Title
  public readonly cards: CardData[]

  private constructor (id: Id, title: Title, cards: CardData[]) {
    this.id = id
    this.title = title
    this.cards = cards
  }

  public static create ({ id, title, cards }: DeckData): Either<InvalidTitleError, Deck> {
    const idOrError = Id.create(id)
    const titleOrError = Title.create(title)

    if (idOrError.isLeft()) return left(new InvalidIdError(id))
    if (titleOrError.isLeft()) return left(new InvalidTitleError(title))

    return right(new Deck(idOrError.value, titleOrError.value, cards))
  }
}
