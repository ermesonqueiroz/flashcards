import { type Either } from '@/common/either'
import { type DeckData } from '@/entities/deck'
import { type CannotFindDeckError } from '@/usecases/errors/cannot-find-deck'

export type GetDeckResponse = Either<CannotFindDeckError, DeckData>
