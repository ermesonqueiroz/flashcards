import { type DomainError } from '../domain-error'

export class InvalidWeightError extends Error implements DomainError {
  public constructor (weight: number) {
    super(`The weight "${weight}" is invalid.`)
    this.name = 'InvalidWeightError'
  }
}
