import { type Either } from '@common/either'
import { type CardData } from '@entities/card'
import { type CannotFindCardError } from '@usecases/errors/cannot-find-card'

export type MarkCardAsDoneResponse = Either<CannotFindCardError, CardData>
