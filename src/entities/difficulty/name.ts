import { type Either, left, right } from '@common/either'
import { InvalidNameError } from '@entities/errors/difficulty'

export class Name {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
  }

  public static create (name: string): Either<InvalidNameError, Name> {
    if (!this.validate(name)) return left(new InvalidNameError(name))

    return right(new Name(name.trim().replace(/  +/g, ' ')))
  }

  public static validate (name: string): boolean {
    if (name.trim().length === 0) return false
    return true
  }

  get value (): string {
    return this.name
  }
}
