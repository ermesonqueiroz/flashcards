import { type Either } from '@common/either'
import { type DifficultyData } from '@entities/difficulty'
import { type InvalidNameError } from '@entities/errors/difficulty'
import { type InvalidWeightError } from '@entities/errors/difficulty/invalid-weight'

export type CreateDifficultyResponse = Either<InvalidNameError | InvalidWeightError, DifficultyData>
