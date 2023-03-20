import { type DeckData } from '@entities/deck'
import { type PrismaClient } from '@prisma/client'
import { type DecksRepository } from '@repositories/ports'

export class PrismaDecksRepository implements DecksRepository {
  public constructor (private readonly prisma: PrismaClient) {}

  public async add ({ id, title }: DeckData): Promise<void> {
    await this.prisma.deck.create({
      data: {
        id,
        title
      }
    })
  }

  public async findAll (): Promise<DeckData[]> {
    const decks = await this.prisma.deck.findMany()

    return decks.map(deck => ({
      id: deck.id,
      title: deck.title
    }))
  }

  public async findById (id: string): Promise<DeckData | null> {
    const deck = await this.prisma.deck.findUnique({
      where: {
        id
      }
    })

    if (!deck) return null

    return {
      id: deck.id,
      title: deck.title
    }
  }
}
