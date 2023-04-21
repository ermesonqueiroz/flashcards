import { type DeckData } from '@/entities/deck'

export interface DecksRepository {
  add: (deck: DeckData) => Promise<void>
  findById: (id: string) => Promise<DeckData | null>
  findAll: () => Promise<DeckData[]>
  delete: (id: string) => Promise<DeckData | null>
  update: (id: string, data: Partial<Omit<DeckData, 'id'>>) => Promise<DeckData | null>
}
