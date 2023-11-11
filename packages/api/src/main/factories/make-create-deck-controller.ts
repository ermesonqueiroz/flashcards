import { CreateDeckController } from '@/adapters/presentation/controllers/create-deck'
import { PrismaDecksRepository, PrismaHelper } from '@/external/repositories/prisma'
import { NativeUuidService } from '@/external/services/native-uuid-service'
import { CreateDeckUseCase } from '@/usecases/create-deck/create-deck'

export function makeCreateDeckController (): CreateDeckController {
  console.log(PrismaHelper.client)
  const decksRepository = new PrismaDecksRepository(PrismaHelper.client)
  const uuidService = new NativeUuidService()
  const createDeckUseCase = new CreateDeckUseCase(decksRepository, uuidService)
  return new CreateDeckController(createDeckUseCase)
}
