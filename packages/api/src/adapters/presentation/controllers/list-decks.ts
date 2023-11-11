import { type ListDecks } from '@/usecases/list-decks/list-decks'
import { ok, serverError } from './helper/http-helper'
import { type Controller } from './ports/controller'
import { type HttpRequest, type HttpResponse } from './ports/http'

export class ListDecksController implements Controller {
  public constructor (private readonly listDecksUseCase: ListDecks) {}

  public async handle (req: HttpRequest): Promise<HttpResponse> {
    try {
      const decks = await this.listDecksUseCase.execute()
      return ok(decks)
    } catch (error) {
      return serverError('internal')
    }
  }
}
