import { ApolloServer, type BaseContext } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import resolvers from '../adapters/presentation/resolvers'
import { type DecksRepository, type CardsRepository } from '@repositories/ports'
import { MysqlHelper } from '../external/repositories/mysql/helpers/mysql-helper'
import { MysqlCardsRepository, MysqlDecksRepository } from '../external/repositories/mysql'
import { readFileSync } from 'fs'
import 'dotenv/config'
import { resolve } from 'path'

export interface MyContext extends BaseContext {
  dataSources: {
    cards: CardsRepository
    decks: DecksRepository
  }
}

async function main () {
  try {
    MysqlHelper.connect(process.env.DATABASE_URL as string)

    const typeDefs = readFileSync(resolve(__dirname, '../../schema.graphql'), { encoding: 'utf-8' })

    const server = new ApolloServer<MyContext>({
      typeDefs,
      resolvers
    })

    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            cards: new MysqlCardsRepository(),
            decks: new MysqlDecksRepository()
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
