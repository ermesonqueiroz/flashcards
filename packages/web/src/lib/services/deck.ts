import { api } from "../api"

export const deckService = {
  create: async (name: string) => {
    await api.post('/decks', {
      name
    })
  }
}
