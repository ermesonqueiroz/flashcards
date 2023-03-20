import { left, right, type Either } from '@common/either'
import { InvalidWeightError } from '@entities/errors/difficulty/invalid-weight'

export class Weight {
  private readonly weight: number

  private constructor (weight: number) {
    this.weight = weight
  }

  public static create (weight: number): Either<InvalidWeightError, Weight> {
    if (!Weight.validate(weight)) return left(new InvalidWeightError(weight))

    return right(new Weight(weight))
  }

  public static validate (weight: number): boolean {
    if (weight >= 1 && weight <= 5) return true
    return false
  }

  get value (): number {
    return this.weight
  }
}
