import { type DomainError } from '../domain-error'

export class InvalidTermError extends Error implements DomainError {
  public constructor (term: string) {
    super(`The term "${term}" is invalid.`)
    this.name = 'InvalidTermError'
  }
}
