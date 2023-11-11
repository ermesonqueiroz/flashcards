import { type DeckData } from '@/entities/deck'
import { type DecksRepository } from '@/repositories/ports'
import { PrismaHelper } from './helper'

export class PrismaDecksRepository implements DecksRepository {
  public async add ({ id, title }: DeckData): Promise<void> {
    await PrismaHelper.client.deck.create({
      data: {
        id,
        title
      }
    })
  }

  public async findAll (): Promise<DeckData[]> {
    const decks = await PrismaHelper.client.deck.findMany()

    return decks.map(deck => ({
      id: deck.id,
      title: deck.title
    }))
  }

  public async findById (id: string): Promise<DeckData | null> {
    const deck = await PrismaHelper.client.deck.findUnique({
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

  public async delete (id: string): Promise<DeckData | null> {
    const deck = await this.findById(id)

    if (!deck) return null

    await PrismaHelper.client.deck.delete({
      where: {
        id
      }
    })

    return {
      id: deck.id,
      title: deck.title
    }
  }

  public async update (id: string, data: Partial<Omit<DeckData, 'id'>>): Promise<DeckData | null> {
    const deck = await this.findById(id)

    if (!deck) return null

    const updatedDeck = await PrismaHelper.client.deck.update({
      where: {
        id
      },
      data: {
        title: data.title
      }
    })

    return {
      id: updatedDeck.id,
      title: updatedDeck.title
    }
  }
}
