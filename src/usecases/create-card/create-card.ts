import { left, right } from '@common/either'
import { Card } from '@entities/card'
import { type CardsRepository } from 'src/repositories/ports/cards-repository'
import { type CreateCardRequest } from './create-card-request'
import { type CreateCardResponse } from './create-card-response'

export class CreateCardUseCase {
  public constructor (private readonly cardsRepository: CardsRepository) {}

  public async execute ({ term, definition }: CreateCardRequest): Promise<CreateCardResponse> {
    const cardOrError = Card.create({
      term,
      definition
    })

    if (cardOrError.isLeft()) return left(cardOrError.value)

    const card = cardOrError.value

    await this.cardsRepository.add({
      term: card.term.value,
      definition: card.definition.value
    })

    return right({
      term: card.term.value,
      definition: card.definition.value
    })
  }
}
