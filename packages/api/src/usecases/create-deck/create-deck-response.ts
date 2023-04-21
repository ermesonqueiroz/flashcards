import { type Either } from '@/common/either'
import { type DeckData } from '@/entities/deck'
import { type InvalidDefinitionError, type InvalidTermError } from '@/entities/errors/card'

export type CreateDeckResponse = Either<InvalidTermError | InvalidDefinitionError, DeckData>
