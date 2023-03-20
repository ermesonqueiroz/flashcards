import { type Either, left, right } from '@common/either'
import { type Id } from '@entities/common/id'
import { InvalidNameError } from '@entities/errors/difficulty'
import { InvalidWeightError } from '@entities/errors/difficulty/invalid-weight'
import { InvalidIdError } from '@entities/errors/id'
import { type DifficultyData } from './difficulty-data'
import { Name } from './name'
import { Weight } from './weight'

export class Difficulty {
  public readonly name: Name
  public readonly weight: Weight

  private constructor (name: Name, weight: Weight) {
    this.name = name
    this.weight = weight
  }

  public static create ({ name, weight }: DifficultyData): Either<InvalidNameError | InvalidWeightError, Difficulty> {
    const nameOrError = Name.create(name)
    const weightOrError = Weight.create(weight)

    if (nameOrError.isLeft()) return left(new InvalidNameError(name))
    if (weightOrError.isLeft()) return left(new InvalidWeightError(weight))

    return right(
      new Difficulty(
        nameOrError.value,
        weightOrError.value
      )
    )
  }
}
