import { ServerError } from '../error'
import { type ResolverResponse } from '../ports/response'

export const badRequest = ({ name, message }: Error): ResolverResponse => ({
  statusCode: 400,
  error: {
    name,
    message
  }
})

export const ok = (body: any): ResolverResponse => ({
  statusCode: 200,
  body
})

export const serverError = (reason: string): ResolverResponse => ({
  statusCode: 500,
  error: new ServerError(reason)
})
