import { type DomainError } from '@/entities/errors'

export class InvalidTitleError extends Error implements DomainError {
  public constructor (title: string) {
    super(`The title "${title}" is invalid.`)
    this.name = 'InvalidTitleError'
  }
}
