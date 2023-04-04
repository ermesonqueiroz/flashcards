import { type DomainError } from './domain-error'

export class InvalidIdError extends Error implements DomainError {
  public constructor (id: string) {
    super(`The id "${id}" is invalid.`)
    this.name = 'InvalidIdError'
  }
}
