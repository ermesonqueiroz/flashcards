import { type DeckData } from '@entities/deck'

export interface DecksRepository {
  add: (deck: DeckData) => Promise<void>
}
