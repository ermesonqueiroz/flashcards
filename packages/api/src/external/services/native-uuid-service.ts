import { type UuidService } from '@/usecases/ports/uuid-service'
import { randomUUID } from 'crypto'

export class NativeUuidService implements UuidService {
  public generate (): string {
    return randomUUID()
  }
}
