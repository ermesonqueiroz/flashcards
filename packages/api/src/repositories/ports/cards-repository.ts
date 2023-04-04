import { type CardData } from '@entities/card'

export interface CardsRepository {
  add: (card: CardData) => Promise<void>
  findByDeckId: (deckId: string) => Promise<CardData[]>
  findById: (id: string) => Promise<CardData | null>
  findAll: () => Promise<CardData[]>
  update: (id: string, data: Partial<Omit<CardData, 'id'>>) => Promise<CardData | null>
}
