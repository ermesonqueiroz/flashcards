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
}
