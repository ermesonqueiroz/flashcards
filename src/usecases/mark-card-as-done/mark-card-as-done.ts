import { left, right } from '@common/either'
import { type CardsRepository } from '@repositories/ports'
import { type DifficultiesRepository } from '@repositories/ports/difficulties-repository'
import { CannotFindCardError } from '@usecases/errors/cannot-find-card'
import { CannotFindDifficultyError } from '@usecases/errors/cannot-find-difficulty'
import { type MarkCardAsDoneRequest } from './mark-card-as-done-request'
import { type MarkCardAsDoneResponse } from './mark-card-as-done-response'

export class MarkCardAsDoneUseCase {
  public constructor (
    private readonly difficultiesRepository: DifficultiesRepository,
    private readonly cardsRepository: CardsRepository
  ) {}

  public async execute ({ id, difficulty }: MarkCardAsDoneRequest): Promise<MarkCardAsDoneResponse> {
    const cardOrError = await this.cardsRepository.findById(id)
    const difficultyOrError = await this.difficultiesRepository.findByName(difficulty)

    if (!cardOrError) return left(new CannotFindCardError(id))
    if (!difficultyOrError) return left(new CannotFindDifficultyError(difficulty))

    const lastView = new Date()

    await this.cardsRepository.update(id, {
      lastView,
      lastDifficulty: difficultyOrError.name
    })

    return right({
      id: cardOrError.id,
      deckId: cardOrError.deckId,
      definition: cardOrError.definition,
      term: cardOrError.term,
      lastDifficulty: difficultyOrError.name,
      lastView
    })
  }
}
