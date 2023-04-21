import { type Either, left, right } from '@/common/either'
import { type InvalidEmailError } from '@/entities/errors/user'
import { Email } from '@/entities/user/email'
import { type EmailActivationCodeData } from './email-activation-data'

export class EmailActivationCode {
  public readonly email: Email
  public readonly code: string
  public readonly expiresAt: Date

  private constructor (email: Email, expiresAt: Date, code: string) {
    this.email = email
    this.expiresAt = expiresAt
    this.code = code
  }

  public static create ({ email, expiresAt }: Omit<EmailActivationCodeData, 'code'>): Either<InvalidEmailError, EmailActivationCode> {
    const emailOrError = Email.create(email)
    if (emailOrError.isLeft()) return left(emailOrError.value)

    const code = new Array(6)
      .map(() => Math.floor(Math.random() * 10))
      .join('')

    return right(
      new EmailActivationCode(
        emailOrError.value,
        expiresAt,
        code
      )
    )
  }
}
