import { type UseCaseError } from './usecase-error'

export class CannotFindDifficultyError extends Error implements UseCaseError {
  constructor (id: string) {
    super(`Cannot find difficulty with id: "${id}".`)
    this.name = 'CannotFindDifficultyError'
  }
}
