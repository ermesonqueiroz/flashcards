import { type Either } from '@common/either'
import { type MailServiceError } from '@usecases/errors/email-service'

export interface EmailOptions {
  readonly host: string
  readonly port: number
  readonly username: string
  readonly password: string
  readonly from: string
  readonly to: string
  readonly subject: string
  readonly text: string
  readonly html: string
}

export interface EmailService {
  send: (options: EmailOptions) => Promise<Either<MailServiceError, EmailOptions>>
}
