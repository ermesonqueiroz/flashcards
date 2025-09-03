export type IndexDecksResponse = {
  data: {
    id: string
    name: string
    cards: {
      id: string
      term: string
      definition: string
      last_difficulty?: number
      last_view?: string
      deck_id: string
    }[]
  }[]
}