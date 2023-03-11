import { left, right } from '@common/either'
import { Deck } from '@entities/deck'
import { randomUUID } from 'crypto'
import { type DecksRepository } from 'src/repositories/ports/decks-repository'
import { type CreateDeckRequest } from './create-deck-request'
import { type CreateDeckResponse } from './create-deck-response'

export class CreateDeckUseCase {
  public constructor (private readonly cardsRepository: DecksRepository) {}

  public async execute ({ title }: CreateDeckRequest): Promise<CreateDeckResponse> {
    const id = randomUUID()

    const deckOrError = Deck.create({
      id,
      title
    })

    if (deckOrError.isLeft()) return left(deckOrError.value)

    const deck = deckOrError.value

    await this.cardsRepository.add({
      id,
      title: deck.title.value
    })

    return right({
      id,
      title: deck.title.value
    })
  }
}
