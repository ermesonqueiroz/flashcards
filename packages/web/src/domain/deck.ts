import { Card, CardData } from "./card"

export interface DeckData {
  id: string
  name: string
  cards: CardData[]
}

export class Deck {
  public constructor(
    readonly id: string,
    readonly name: string,
    readonly cards: Card[]
  ) {}

  static fromJSON(data: Record<string, unknown>) {
    const cards: Card[] = (data.cards as Record<string, unknown>[]).map((record) => Card.fromJSON(record))

    return new Deck(
      data.id as string,
      data.name as string,
      cards
    )
  }

  public toJSON(): DeckData {
    return {
      id: this.id,
      name: this.name,
      cards: this.cards.map((card) => card.toJSON())
    }
  }
}
