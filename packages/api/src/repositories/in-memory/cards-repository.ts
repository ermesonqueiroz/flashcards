import { type CardData } from '@/entities/card'
import { type CardsRepository } from '@/repositories/ports/cards-repository'

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

  public async findAll (): Promise<CardData[]> {
    return this.items
  }

  public async findById (id: string): Promise<CardData | null> {
    return this.items.find((card) => card.id === id) ?? null
  }

  public async update (id: string, data: Partial<Omit<CardData, 'id'>>): Promise<CardData | null> {
    const index = this.items.findIndex((card) => card.id === id)
    const card = {
      ...this.items[index],
      ...data
    }

    this.items[index] = card

    return card
  }
}
