import { left, right } from '@/common/either'
import { type CardsRepository } from '@/repositories/ports'
import { CannotFindCardError } from '@/usecases/errors/cannot-find-card'
import { type MarkCardAsDoneRequest } from './mark-card-as-done-request'
import { type MarkCardAsDoneResponse } from './mark-card-as-done-response'

export class MarkCardAsDoneUseCase {
  public constructor (
    private readonly cardsRepository: CardsRepository
  ) {}

  public async execute ({ id, difficulty }: MarkCardAsDoneRequest): Promise<MarkCardAsDoneResponse> {
    const cardOrError = await this.cardsRepository.findById(id)

    if (!cardOrError) return left(new CannotFindCardError(id))

    const lastView = new Date()

    await this.cardsRepository.update(id, {
      lastView,
      lastDifficulty: difficulty
    })

    return right({
      id: cardOrError.id,
      deckId: cardOrError.deckId,
      definition: cardOrError.definition,
      term: cardOrError.term,
      lastDifficulty: difficulty,
      lastView
    })
  }
}
