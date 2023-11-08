import { type UuidService } from '../ports/uuid-service'

export class UuidServiceStub implements UuidService {
  public generate = jest.fn()
}
