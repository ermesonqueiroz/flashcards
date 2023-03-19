import { type Either, left, right } from '@common/either'
import { InvalidDefinitionError } from '@entities/errors/card'

export class Username {
  private readonly username: string

  private constructor (username: string) {
    this.username = username
  }

  public static create (username: string): Either<InvalidDefinitionError, Username> {
    if (!this.validate(username)) return left(new InvalidDefinitionError(username))

    return right(new Username(username.trim().replace(/  +/g, ' ')))
  }

  public static validate (username: string): boolean {
    if (username.trim().length === 0) return false
    return true
  }

  get value (): string {
    return this.username
  }
}
