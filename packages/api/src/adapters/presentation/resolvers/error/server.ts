import { type ResolverError } from './resolver'

export class ServerError extends Error implements ResolverError {
  constructor (reason: string) {
    super('Server error: ' + reason + '.')
    this.name = 'ServerError'
  }
}
