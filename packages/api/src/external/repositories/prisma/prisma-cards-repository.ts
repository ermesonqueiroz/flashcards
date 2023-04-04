import { type CardData } from '@entities/card'
import { type PrismaClient } from '@prisma/client'
import { type CardsRepository } from '@repositories/ports'

export class PrismaCardsRepository implements CardsRepository {
  public constructor (private readonly prisma: PrismaClient) {}

  public async add (card: CardData): Promise<void> {
    await this.prisma.card.create({
      data: {
        id: card.id,
        term: card.term,
        definition: card.definition,
        deckId: card.deckId
      }
    })
  }

  public async findById (id: string): Promise<CardData | null> {
    const card = await this.prisma.card.findUnique({
      where: {
        id
      }
    })

    if (!card) return null

    return {
      id: card.id,
      deckId: card.deckId,
      definition: card.definition,
      term: card.term,
      lastDifficulty: card?.lastDifficulty ?? undefined,
      lastView: card?.lastView ?? undefined
    }
  }

  public async findByDeckId (deckId: string): Promise<CardData[]> {
    const cards = await this.prisma.card.findMany({
      where: {
        deckId
      }
    })

    return cards.map(card => ({
      id: card.id,
      deckId: card.deckId,
      definition: card.definition,
      term: card.term,
      lastDifficulty: card?.lastDifficulty ?? undefined,
      lastView: card?.lastView ?? undefined
    }))
  }

  public async findAll (): Promise<CardData[]> {
    const cards = await this.prisma.card.findMany()

    return cards.map(card => ({
      id: card.id,
      deckId: card.deckId,
      definition: card.definition,
      term: card.term,
      lastDifficulty: card.lastDifficulty ?? undefined,
      lastView: card.lastView ?? undefined
    }))
  }

  public async update (id: string, data: Partial<Omit<CardData, 'id'>>): Promise<CardData | null> {
    const card = await this.findById(id)

    if (!card) return null

    const updatedCard = await this.prisma.card.update({
      where: {
        id
      },
      data: {
        deckId: data.deckId,
        definition: data.definition,
        term: data.term,
        lastDifficulty: data.lastDifficulty,
        lastView: data.lastView
      }
    })

    return {
      id: updatedCard.id,
      deckId: updatedCard.deckId,
      definition: updatedCard.definition,
      term: updatedCard.term,
      lastDifficulty: updatedCard?.lastDifficulty ?? undefined,
      lastView: updatedCard?.lastView ?? undefined
    }
  }
}
