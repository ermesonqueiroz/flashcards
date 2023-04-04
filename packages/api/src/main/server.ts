import { ApolloServer, type BaseContext } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import resolvers from '../adapters/presentation/resolvers'
import { type DecksRepository, type CardsRepository } from '@repositories/ports'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { PrismaCardsRepository, PrismaDecksRepository } from 'src/external/repositories/prisma'
import { PrismaClient } from '@prisma/client'
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers
} from 'graphql-scalars'
import 'dotenv/config'

export interface MyContext extends BaseContext {
  dataSources: {
    cards: CardsRepository
    decks: DecksRepository
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
            decks: new PrismaDecksRepository(prisma)
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
