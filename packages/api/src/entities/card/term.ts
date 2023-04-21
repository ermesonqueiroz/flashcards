import { type Either, left, right } from '@/common/either'
import { InvalidTermError } from '@/entities/errors/card'

export class Term {
  private readonly term: string

  private constructor (term: string) {
    this.term = term
  }

  public static create (term: string): Either<InvalidTermError, Term> {
    if (!this.validate(term)) return left(new InvalidTermError(term))

    return right(new Term(term.trim().replace(/  +/g, ' ')))
  }

  public static validate (term: string): boolean {
    if (term.trim().length === 0) return false
    return true
  }

  get value (): string {
    return this.term
  }
}
