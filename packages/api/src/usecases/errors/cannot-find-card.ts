import { type UseCaseError } from './usecase-error'

export class CannotFindCardError extends Error implements UseCaseError {
  constructor (id: string) {
    super(`Cannot find card with id: "${id}".`)
    this.name = 'CannotFindCardError'
  }
}
