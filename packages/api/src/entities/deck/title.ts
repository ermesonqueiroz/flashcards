import { type Either, left, right } from '@common/either'
import { InvalidTitleError } from '@entities/errors/deck'

export class Title {
  private readonly title: string

  private constructor (title: string) {
    this.title = title
  }

  public static create (title: string): Either<InvalidTitleError, Title> {
    if (!this.validate(title)) return left(new InvalidTitleError(title))

    return right(new Title(title.trim().replace(/  +/g, ' ')))
  }

  public static validate (title: string): boolean {
    if (title.trim().length === 0) return false
    return true
  }

  get value (): string {
    return this.title
  }
}
