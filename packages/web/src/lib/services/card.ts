import { api } from "../api"

export interface CreateCard {
  term: string
  definition: string
}

export const cardService = {
  create: async (deckId: string, data: CreateCard) => {
    const { data: response } = await api.post<{ data: Record<string, unknown> }>(`/decks/${deckId}/cards`, data)
    return response.data
  },
  markCardAsRead: async (cardId: string, difficulty: number) => {
    await api.post(`/cards/${cardId}/done`, {
      difficulty
    })
  }
}
