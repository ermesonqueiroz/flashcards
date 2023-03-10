import { type CardData } from '@entities/card'

export interface CardsRepository {
  add: (card: CardData) => Promise<void>
  findByDeckId: (deckId: string) => Promise<CardData[]>
}
