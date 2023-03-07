import { type DeckData } from '@entities/deck'
import { type DecksRepository } from '../ports/decks-repository'

export class InMemoryDecksRepository implements DecksRepository {
  private readonly items: DeckData[]

  public constructor (items: DeckData[]) {
    this.items = items
  }

  public async add (deck: DeckData): Promise<void> {
    this.items.push(deck)
  }
}
