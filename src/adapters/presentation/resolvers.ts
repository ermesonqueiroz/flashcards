import { CreateCardUseCase } from '@usecases/create-card/create-card'
import { CreateDeckUseCase } from '@usecases/create-deck/create-deck'
import { CreateDifficultyUseCase } from '@usecases/create-difficulty/create-difficulty'
import { GetDeckUseCase } from '@usecases/get-deck/get-deck'
import { MarkCardAsDoneUseCase } from '@usecases/mark-card-as-done/mark-card-as-done'
import { type Resolvers } from 'src/__generated__/resolvers-types'

export default {
  Query: {
    decks: async (_, params, contextValue) => {
      return await contextValue.dataSources.decks.findAll()
    },
    deck: async (_, { id }, contextValue) => {
      const getDeckUseCase = new GetDeckUseCase(contextValue.dataSources.decks, contextValue.dataSources.cards)

      const deckOrError = await getDeckUseCase.execute({ id })

      if (deckOrError.isLeft()) return {}
      return {
        id: deckOrError.value.id,
        title: deckOrError.value.title,
        cards: deckOrError.value.cards
      }
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
    },
    cardDone: async (_, { cardId: id, difficulty }, contextValue) => {
      const markCardAsDoneUseCase = new MarkCardAsDoneUseCase(
        contextValue.dataSources.difficulties,
        contextValue.dataSources.cards
      )

      const response = await markCardAsDoneUseCase.execute({
        id,
        difficulty
      })

      if (response.isLeft()) return false
      return true
    },
    addDifficulty: async (_, { name, weight }, contextValue) => {
      const createDifficultyUseCase = new CreateDifficultyUseCase(contextValue.dataSources.difficulties)

      const difficultyOrError = await createDifficultyUseCase.execute({
        name,
        weight
      })

      if (difficultyOrError.isLeft()) return {}
      return {
        name: difficultyOrError.value.name,
        weight: difficultyOrError.value.weight
      }
    }
  }
} as Resolvers
