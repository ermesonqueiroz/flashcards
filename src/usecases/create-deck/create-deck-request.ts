import { type CardData } from '@entities/card'

export interface CreateDeckRequest {
  title: string
  cards: CardData[]
}
