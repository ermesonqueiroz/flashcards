import { type DomainError } from './domain-error'

export class InvalidDefinitionError extends Error implements DomainError {
  public constructor (definition: string) {
    super(`The definition "${definition}" is invalid.`)
    this.name = 'InvalidDefinitionError'
  }
}
