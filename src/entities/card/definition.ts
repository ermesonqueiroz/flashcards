import { type Either, left, right } from '@common/either'
import { InvalidDefinitionError } from '@entities/errors'

export class Definition {
  private readonly definition: string

  private constructor (definition: string) {
    this.definition = definition
  }

  public static create (definition: string): Either<InvalidDefinitionError, Definition> {
    if (!this.validate(definition)) return left(new InvalidDefinitionError(definition))

    return right(new Definition(definition.trim().replace(/  +/g, ' ')))
  }

  public static validate (definition: string): boolean {
    if (definition.trim().length === 0) return false
    return true
  }

  get value (): string {
    return this.definition
  }
}
