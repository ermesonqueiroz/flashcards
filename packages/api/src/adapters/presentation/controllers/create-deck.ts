import { type ICreateDeckUseCase } from '@/usecases/create-deck/create-deck'
import { badRequest, ok, serverError, validateRequiredParameters } from './helper/http-helper'
import { type Controller } from './ports/controller'
import { type HttpRequest, type HttpResponse } from './ports/http'
import { type UuidService } from '@/usecases/ports/uuid-service'

export interface CreateDeckExpectedBody {
  title: string
}

export class CreateDeckController implements Controller {
  public constructor (
    private readonly createDeckUseCase: ICreateDeckUseCase,
    private readonly uuidService: UuidService
  ) {}

  public async handle (req: HttpRequest): Promise<HttpResponse> {
    try {
      const bodyOrError = validateRequiredParameters<CreateDeckExpectedBody>(req.body, ['title'])
      if (bodyOrError.isLeft()) return badRequest(bodyOrError.value)

      const deckOrError = await this.createDeckUseCase.execute({
        id: this.uuidService.generate(),
        title: bodyOrError.value.title
      })

      if (deckOrError.isLeft()) return badRequest(deckOrError.value)
      return ok(deckOrError.value)
    } catch (error) {
      return serverError('internal')
    }
  }
}
