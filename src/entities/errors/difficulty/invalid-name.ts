import { type DomainError } from '../domain-error'

export class InvalidNameError extends Error implements DomainError {
  public constructor (name: string) {
    super(`The name "${name}" is invalid.`)
    this.name = 'InvalidNameError'
  }
}
