import { api } from "../api"

export const deckService = {
  create: async (name: string) => {
    await api.post('/decks', {
      name
    })
  },
  rename: async (id: string, name: string) => {
    await api.patch(`/decks/${id}`, {
      name
    })
  },
  delete: async (id: string) => {
    await api.delete(`/decks/${id}`)
  }
}
