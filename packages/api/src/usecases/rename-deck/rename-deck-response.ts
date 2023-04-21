import { type Either } from '@/common/either'
import { type DeckData } from '@/entities/deck'
import { type InvalidTitleError } from '@/entities/errors/deck'
import { type CannotFindDeckError } from '@/usecases/errors/cannot-find-deck'

export type RenameDeckResponse = Either<CannotFindDeckError | InvalidTitleError, DeckData>
