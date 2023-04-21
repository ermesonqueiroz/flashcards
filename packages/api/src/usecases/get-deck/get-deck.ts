import { left, right } from '@/common/either'
import { type CardsRepository, type DecksRepository } from '@/repositories/ports'
import { CannotFindDeckError } from '@/usecases/errors/cannot-find-deck'
import { type GetDeckRequest } from './get-deck-request'
import { type GetDeckResponse } from './get-deck-response'

export class GetDeckUseCase {
  constructor (
    private readonly decksRepository: DecksRepository,
    private readonly cardsRepository: CardsRepository
  ) {}

  public async execute ({ id }: GetDeckRequest): Promise<GetDeckResponse> {
    const deck = await this.decksRepository.findById(id)
    const cards = await this.cardsRepository.findByDeckId(id)

    if (!deck) return left(new CannotFindDeckError(id))

    return right({
      id: deck.id,
      title: deck.title,
      cards
    })
  }
}
