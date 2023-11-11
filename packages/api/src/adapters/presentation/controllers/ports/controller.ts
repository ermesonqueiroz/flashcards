import { type HttpRequest, type HttpResponse } from './http'

export interface Controller {
  handle: (req: HttpRequest) => Promise<HttpResponse>
}
