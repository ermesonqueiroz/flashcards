import { left, right } from '@/common/either'
import { Deck } from '@/entities/deck'
import { type DecksRepository } from '@/repositories/ports/decks-repository'
import { type CreateDeckRequest } from './create-deck-request'
import { type CreateDeckResponse } from './create-deck-response'
import { type UuidService } from '@/usecases/ports/uuid-service'

export class CreateDeckUseCase {
  public constructor (
    private readonly cardsRepository: DecksRepository,
    private readonly uuidService: UuidService
  ) {}

  public async execute ({ title }: CreateDeckRequest): Promise<CreateDeckResponse> {
    const id = this.uuidService.generate()

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
