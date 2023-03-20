import { left, right } from '@common/either'
import { Difficulty } from '@entities/difficulty'
import { type DifficultiesRepository } from '@repositories/ports'
import { type CreateDifficultyRequest } from './create-difficulty-request'
import { type CreateDifficultyResponse } from './create-difficulty-response'

export class CreateDifficultyUseCase {
  public constructor (private readonly difficultiesRepository: DifficultiesRepository) {}

  public async execute ({ name, weight }: CreateDifficultyRequest): Promise<CreateDifficultyResponse> {
    const difficultyOrError = Difficulty.create({
      name,
      weight
    })

    if (difficultyOrError.isLeft()) return left(difficultyOrError.value)

    await this.difficultiesRepository.add({
      name,
      weight
    })

    return right({
      name,
      weight
    })
  }
}
