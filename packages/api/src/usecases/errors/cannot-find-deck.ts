import { type UseCaseError } from './usecase-error'

export class CannotFindDeckError extends Error implements UseCaseError {
  constructor (id: string) {
    super(`Cannot find deck with id: "${id}".`)
    this.name = 'CannotFindDeckError'
  }
}
