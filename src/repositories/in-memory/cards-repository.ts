import { type CardData } from '@entities/card'
import { type CardsRepository } from '../ports/cards-repository'

export class InMemoryCardsRepository implements CardsRepository {
  private readonly items: CardData[]

  public constructor (items: CardData[]) {
    this.items = items
  }

  public async add (card: CardData): Promise<void> {
    this.items.push(card)
  }

  public async findByDeckId (deckId: string): Promise<CardData[]> {
    return this.items.filter((card) => card.deckId === deckId)
  }
}
