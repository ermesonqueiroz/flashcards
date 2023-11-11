import { left, right } from '@/common/either'
import { Deck, type DeckData } from '@/entities/deck'
import { type DecksRepository } from '@/repositories/ports/decks-repository'
import { type CreateDeckRequest } from './create-deck-request'
import { type CreateDeckResponse } from './create-deck-response'

export interface ICreateDeckUseCase {
  execute: (createDeckRequest: CreateDeckRequest) => Promise<CreateDeckResponse>
}

export class CreateDeckUseCase implements ICreateDeckUseCase {
  public constructor (
    private readonly decksRepository: DecksRepository
  ) {}

  public async execute (createDeckRequest: CreateDeckRequest): Promise<CreateDeckResponse> {
    const deckOrError = Deck.create(createDeckRequest)
    if (deckOrError.isLeft()) return left(deckOrError.value)

    const deck = deckOrError.value
    const deckData: DeckData = {
      id: deck.id.value,
      title: deck.title.value
    }

    await this.decksRepository.add(deckData)
    return right(deckData)
  }
}
