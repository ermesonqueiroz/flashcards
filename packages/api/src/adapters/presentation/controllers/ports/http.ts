export interface HttpRequest {
  body?: any
}

export type HttpResponse = () => void

export interface HttpResponseUtils {
  ok: (body: any) => () => void
  badRequest: (error: Error) => () => void
  serverError: (reason: string) => () => void
}
