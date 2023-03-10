import { type CardData } from '@entities/card'

export interface DeckData {
  id: string
  title: string
  cards: CardData[]
}
