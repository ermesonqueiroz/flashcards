import { left, right } from '@common/either'
import { Deck } from '@entities/deck'
import { type DecksRepository } from 'src/repositories/ports/decks-repository'
import { type CreateDeckRequest } from './create-deck-request'
import { type CreateDeckResponse } from './create-deck-response'

export class CreateDeckUseCase {
  public constructor (private readonly cardsRepository: DecksRepository) {}

  public async execute ({ title, cards }: CreateDeckRequest): Promise<CreateDeckResponse> {
    const deckOrError = Deck.create({
      title,
      cards
    })

    if (deckOrError.isLeft()) return left(deckOrError.value)

    const deck = deckOrError.value

    await this.cardsRepository.add({
      title: deck.title.value,
      cards: deck.cards
    })

    return right({
      title: deck.title.value,
      cards: deck.cards
    })
  }
}
