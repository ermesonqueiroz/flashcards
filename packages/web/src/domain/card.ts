export interface Card {
  id: string
  term: string
  definition: string
  deckId: string
  lastDifficulty?: number
  lastView?: Date
}
