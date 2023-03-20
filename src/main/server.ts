import { ApolloServer, type BaseContext } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import resolvers from '../adapters/presentation/resolvers'
import { type DecksRepository, type CardsRepository } from '@repositories/ports'
import { readFileSync } from 'fs'
import 'dotenv/config'
import { resolve } from 'path'
import { type DifficultiesRepository } from '@repositories/ports/difficulties-repository'
import { PrismaCardsRepository, PrismaDecksRepository, PrismaDifficultiesRepository } from 'src/external/repositories/prisma'
import { PrismaClient } from '@prisma/client'
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers
} from 'graphql-scalars'

export interface MyContext extends BaseContext {
  dataSources: {
    cards: CardsRepository
    decks: DecksRepository
    difficulties: DifficultiesRepository
  }
}

async function main () {
  try {
    const prisma = new PrismaClient()

    const typeDefs = readFileSync(resolve(__dirname, '../../schema.graphql'), { encoding: 'utf-8' })

    const server = new ApolloServer<MyContext>({
      typeDefs: [
        ...scalarTypeDefs,
        typeDefs
      ],
      resolvers: {
        ...scalarResolvers,
        ...resolvers
      }
    })

    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            cards: new PrismaCardsRepository(prisma),
            decks: new PrismaDecksRepository(prisma),
            difficulties: new PrismaDifficultiesRepository(prisma)
          }
        }
      }
    })

    console.log(`Server is running at: ${url}`)
  } catch (error) {
    console.log(error)
  }
}

main()
