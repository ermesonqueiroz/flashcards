import { type ControllerError } from './controller-error'

export class MissingParamError extends Error implements ControllerError {
  public constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
