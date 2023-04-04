import { CreateCardUseCase } from '@usecases/create-card/create-card'
import { CreateDeckUseCase } from '@usecases/create-deck/create-deck'
import { DeleteDeckUseCase } from '@usecases/delete-deck/delete-deck'
import { GetDeckUseCase } from '@usecases/get-deck/get-deck'
import { MarkCardAsDoneUseCase } from '@usecases/mark-card-as-done/mark-card-as-done'
import { RenameDeckUseCase } from '@usecases/rename-deck/rename-deck'
import { type Resolvers } from 'src/__generated__/resolvers-types'
import { ok, badRequest, serverError } from './helpers/response-helper'

export default {
  Query: {
    decks: async (_, params, contextValue) => {
      try {
        const decks = await contextValue.dataSources.decks.findAll()

        return ok(decks)
      } catch {
        return serverError('internal')
      }
    },
    deck: async (_, { id }, contextValue) => {
      try {
        const getDeckUseCase = new GetDeckUseCase(contextValue.dataSources.decks, contextValue.dataSources.cards)

        const deckOrError = await getDeckUseCase.execute({ id })

        if (deckOrError.isLeft()) return badRequest(deckOrError.value)
        return ok({
          id: deckOrError.value.id,
          title: deckOrError.value.title,
          cards: deckOrError.value.cards
        })
      } catch {
        return serverError('internal')
      }
    },
    cards: async (_, params, contextValue) => {
      try {
        const cards = await contextValue.dataSources.cards.findAll()

        return ok(cards)
      } catch {
        return serverError('internal')
      }
    }
  },
  Mutation: {
    addCard: async (_, { deckId, definition, term }, contextValue) => {
      try {
        const createCardUseCase = new CreateCardUseCase(contextValue.dataSources.cards)

        const cardOrError = await createCardUseCase.execute({
          deckId,
          definition,
          term
        })

        if (cardOrError.isLeft()) return badRequest(cardOrError.value)
        return ok({
          id: cardOrError.value.id,
          deckId: cardOrError.value.deckId,
          term: cardOrError.value.term,
          definition: cardOrError.value.definition
        })
      } catch {
        return serverError('internal')
      }
    },
    addDeck: async (_, { title }, contextValue) => {
      try {
        const createDeckUseCase = new CreateDeckUseCase(contextValue.dataSources.decks)

        const deckOrError = await createDeckUseCase.execute({
          title
        })

        if (deckOrError.isLeft()) return badRequest(deckOrError.value)
        return ok({
          id: deckOrError.value.id,
          title: deckOrError.value.title
        })
      } catch {
        return serverError('internal')
      }
    },
    cardDone: async (_, { cardId: id, difficulty }, contextValue) => {
      try {
        const markCardAsDoneUseCase = new MarkCardAsDoneUseCase(
          contextValue.dataSources.cards
        )

        const response = await markCardAsDoneUseCase.execute({
          id,
          difficulty
        })

        if (response.isLeft()) return badRequest(response.value)
        return ok({
          id: response.value.id,
          deckId: response.value.deckId,
          term: response.value.term,
          definition: response.value.definition,
          lastDifficulty: response.value.lastDifficulty,
          lastView: response.value.lastView
        })
      } catch {
        return serverError('internal')
      }
    },
    deleteDeck: async (_, { id }, contextValue) => {
      try {
        const deleteDeckUseCase = new DeleteDeckUseCase(contextValue.dataSources.decks)
        const deletedDeckOrError = await deleteDeckUseCase.execute({ id })

        if (deletedDeckOrError.isLeft()) return badRequest(deletedDeckOrError.value)
        return ok({
          id: deletedDeckOrError.value.id,
          title: deletedDeckOrError.value.title
        })
      } catch {
        return serverError('internal')
      }
    },
    renameDeck: async (_, { id, title }, contextValue) => {
      try {
        const renameDeckUseCase = new RenameDeckUseCase(contextValue.dataSources.decks)
        const renamedDeckOrError = await renameDeckUseCase.execute({ id, title })

        if (renamedDeckOrError.isLeft()) return badRequest(renamedDeckOrError.value)
        return ok({
          id: renamedDeckOrError.value.id,
          title: renamedDeckOrError.value.title
        })
      } catch {
        return serverError('internal')
      }
    }
  }
} as Resolvers
