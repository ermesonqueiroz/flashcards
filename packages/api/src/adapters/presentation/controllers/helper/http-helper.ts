import { type Either, left, right } from '@/common/either'
import { type HttpResponse } from '../ports/http'
import { MissingParamError, ServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason)
})

export function validateRequiredParameters<T> (body: Record<string, any>, requiredFields: string[]): Either<MissingParamError, T> {
  const paramFound = requiredFields.find((field) => {
    return !Reflect.has(body, field)
  })

  return paramFound
    ? left(new MissingParamError(paramFound))
    : right(body as T)
}
