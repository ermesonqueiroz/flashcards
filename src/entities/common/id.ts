import { type Either, left, right } from '@common/either'
import { InvalidIdError } from '@entities/errors/id'

export class Id {
  public readonly id: string

  private constructor (id: string) {
    this.id = id
  }

  public static create (id: string): Either<InvalidIdError, Id> {
    if (!this.validate(id)) return left(new InvalidIdError(id))

    return right(new Id(id))
  }

  public static validate (term: string): boolean {
    if (term.trim().length === 0) return false
    return true
  }

  get value (): string {
    return this.id
  }
}
