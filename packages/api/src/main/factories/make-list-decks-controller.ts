import { ListDecksController } from '@/adapters/presentation/controllers/list-decks'
import { PrismaDecksRepository } from '@/external/repositories/prisma'
import { ListDecksUseCase } from '@/usecases/list-decks/list-decks'

export function makeListDecksController (): ListDecksController {
  const decksRepository = new PrismaDecksRepository()
  const listDecksUseCase = new ListDecksUseCase(decksRepository)
  return new ListDecksController(listDecksUseCase)
}
