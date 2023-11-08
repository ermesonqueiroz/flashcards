import { left, right } from '@/common/either'
import { Card } from '@/entities/card'
import { type CardsRepository } from '@/repositories/ports/cards-repository'
import { type CreateCardRequest } from './create-card-request'
import { type CreateCardResponse } from './create-card-response'
import { type UuidService } from '../ports/uuid-service'

export class CreateCardUseCase {
  public constructor (
    private readonly cardsRepository: CardsRepository,
    private readonly uuidService: UuidService
  ) {}

  public async execute ({ deckId, term, definition }: CreateCardRequest): Promise<CreateCardResponse> {
    const id = this.uuidService.generate()

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
