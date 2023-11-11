import { type HttpResponseUtils, type HttpRequest, type HttpResponse } from './http'

export interface Controller {
  handle: (req: HttpRequest, httpResponseUtils: HttpResponseUtils) => Promise<HttpResponse>
}
