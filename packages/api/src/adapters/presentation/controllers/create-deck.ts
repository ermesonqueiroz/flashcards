import { type Controller } from './ports/controller'
import { type HttpRequest, type HttpResponseUtils, type HttpResponse } from './ports/http'
import { type CreateDeckUseCase } from '@/usecases/create-deck/create-deck'

export class CreateDeckController implements Controller {
  public constructor (private readonly createDeckUseCase: CreateDeckUseCase) {}

  public async handle (req: HttpRequest, httpResponseUtils: HttpResponseUtils): Promise<HttpResponse> {
    try {
      const deckOrError = await this.createDeckUseCase.execute({ title: req.body?.title })

      if (deckOrError.isLeft()) return httpResponseUtils.badRequest(deckOrError.value)
      return httpResponseUtils.ok(deckOrError.value)
    } catch (error) {
      return httpResponseUtils.serverError('internal')
    }
  }
}
