import { type DifficultyData } from '@entities/difficulty'
import { type PrismaClient } from '@prisma/client'
import { type DifficultiesRepository } from '@repositories/ports'

export class PrismaDifficultiesRepository implements DifficultiesRepository {
  public constructor (private readonly prisma: PrismaClient) {}

  public async add ({ name, weight }: DifficultyData): Promise<void> {
    await this.prisma.difficulty.create({
      data: {
        name,
        weight
      }
    })
  }

  public async findByName (name: string): Promise<DifficultyData | null> {
    const difficulty = await this.prisma.difficulty.findUnique({
      where: {
        name
      }
    })

    if (!difficulty) return null

    return {
      name: difficulty.name,
      weight: difficulty.weight
    }
  }
}
