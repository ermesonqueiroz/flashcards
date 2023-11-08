import { type DeckData } from '@/entities/deck'
import { type DecksRepository } from '@/repositories/ports/decks-repository'

export class InMemoryDecksRepository implements DecksRepository {
  private readonly items: DeckData[]

  public constructor (items: DeckData[]) {
    this.items = items
  }

  public async add (deck: DeckData): Promise<void> {
    this.items.push(deck)
  }

  public async findById (id: string): Promise<DeckData | null> {
    return this.items.find((deck) => deck.id === id) ?? null
  }

  public async findAll (): Promise<DeckData[]> {
    return this.items
  }

  public async delete (id: string): Promise<DeckData | null> {
    const index = this.items.findIndex((deck) => deck.id === id)
    const deck = this.items[index]

    this.items.splice(index)

    return deck
  }

  public async update (id: string, data: Partial<Omit<DeckData, 'id'>>): Promise<DeckData | null> {
    const index = this.items.findIndex((deck) => deck.id === id)
    const deck = {
      ...this.items[index],
      ...data
    }

    this.items[index] = deck

    return deck
  }
}
