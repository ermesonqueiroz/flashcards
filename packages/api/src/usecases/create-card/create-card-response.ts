import { type Either } from '@/common/either'
import { type CardData } from '@/entities/card'
import { type InvalidDefinitionError, type InvalidTermError } from '@/entities/errors/card'

export type CreateCardResponse = Either<InvalidTermError | InvalidDefinitionError, CardData>
