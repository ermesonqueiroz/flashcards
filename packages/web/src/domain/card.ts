export interface CardData {
  id: string
  term: string
  definition: string
  deckId: string
  lastDifficulty?: number | null
  lastView?: string | null
}

export class Card {
  public constructor(
    readonly id: string,
    readonly term: string,
    readonly definition: string,
    readonly deckId: string,
    readonly lastDifficulty?: number,
    readonly lastView?: Date,
  ) {}

  static fromJSON(data: Record<string, unknown>) {
    return new Card(
      data.id as string,
      data.term as string,
      data.definition as string,
      data.deck_id as string,
      data?.last_difficulty as number,
      new Date(data?.last_view as string)
    )
  }

  public toJSON(): CardData {
    return {
      id: this.id,
      term: this.term,
      definition: this.definition,
      deckId: this.deckId,
      lastDifficulty: this.lastDifficulty,
      lastView: this.lastView?.toISOString(),
    }
  }
}
