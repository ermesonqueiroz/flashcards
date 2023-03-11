import { CreateCardUseCase } from '@usecases/create-card/create-card'
import { CreateDeckUseCase } from '@usecases/create-deck/create-deck'
import { type Resolvers } from 'src/__generated__/resolvers-types'

export default {
  Query: {
    hello: () => {
      return 'Hello World'
    }
  },
  Mutation: {
    addCard: async (_, { deckId, definition, term }, contextValue) => {
      const createCardUseCase = new CreateCardUseCase(contextValue.dataSources.cards)

      const cardOrError = await createCardUseCase.execute({
        deckId,
        definition,
        term
      })

      if (cardOrError.isLeft()) return {}
      return {
        id: cardOrError.value.id,
        deckId: cardOrError.value.deckId,
        term: cardOrError.value.term,
        definition: cardOrError.value.definition
      }
    },
    addDeck: async (_, { title }, contextValue) => {
      const createDeckUseCase = new CreateDeckUseCase(contextValue.dataSources.decks)

      const deckOrError = await createDeckUseCase.execute({
        title
      })

      if (deckOrError.isLeft()) return {}
      return {
        id: deckOrError.value.id,
        title: deckOrError.value.title
      }
    }
  }
} as Resolvers
