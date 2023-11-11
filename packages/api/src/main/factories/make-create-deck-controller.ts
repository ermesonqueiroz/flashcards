import { CreateDeckController } from '@/adapters/presentation/controllers/create-deck'
import { PrismaDecksRepository } from '@/external/repositories/prisma'
import { NativeUuidService } from '@/external/services/native-uuid-service'
import { CreateDeckUseCase } from '@/usecases/create-deck/create-deck'

export function makeCreateDeckController (): CreateDeckController {
  const decksRepository = new PrismaDecksRepository()
  const uuidService = new NativeUuidService()
  const createDeckUseCase = new CreateDeckUseCase(decksRepository)
  return new CreateDeckController(createDeckUseCase, uuidService)
}
