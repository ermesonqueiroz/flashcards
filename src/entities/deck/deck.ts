import { type Either, right, left } from '@common/either'
import { type CardData } from '@entities/card'
import { InvalidTitleError } from '@entities/errors/deck'
import { type DeckData } from './deck-data'
import { Title } from './title'

export class Deck {
  public readonly title: Title
  public readonly cards: CardData[]

  private constructor (title: Title, cards: CardData[]) {
    this.title = title
    this.cards = cards
  }

  public static create ({ title, cards }: DeckData): Either<InvalidTitleError, Deck> {
    const titleOrError = Title.create(title)

    if (titleOrError.isLeft()) return left(new InvalidTitleError(title))

    return right(new Deck(titleOrError.value, cards))
  }
}
