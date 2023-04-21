import { left, right } from '@/common/either'
import { Card } from '@/entities/card'
import { randomUUID } from 'crypto'
import { type CardsRepository } from '@/repositories/ports/cards-repository'
import { type CreateCardRequest } from './create-card-request'
import { type CreateCardResponse } from './create-card-response'

export class CreateCardUseCase {
  public constructor (private readonly cardsRepository: CardsRepository) {}

  public async execute ({ deckId, term, definition }: CreateCardRequest): Promise<CreateCardResponse> {
    const id = randomUUID()

    const cardOrError = Card.create({
      id,
      deckId,
      term,
      definition
    })

    if (cardOrError.isLeft()) return left(cardOrError.value)

    const card = cardOrError.value

    await this.cardsRepository.add({
      id,
      deckId,
      term: card.term.value,
      definition: card.definition.value
    })

    return right({
      id,
      deckId,
      term: card.term.value,
      definition: card.definition.value
    })
  }
}
