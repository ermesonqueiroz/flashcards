import { type DomainError } from '../domain-error'

export class InvalidUsernameError extends Error implements DomainError {
  public constructor (username: string) {
    super(`The username "${username}" is invalid.`)
    this.name = 'InvalidUsernameError'
  }
}
