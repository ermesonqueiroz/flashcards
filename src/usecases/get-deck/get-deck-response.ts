import { type Either } from '@common/either'
import { type CardData } from '@entities/card'
import { type DeckData } from '@entities/deck'

export type GetDeckResponse = Either<Error, DeckData & { cards: CardData[] }>
