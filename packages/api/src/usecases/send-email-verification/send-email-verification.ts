import { left, right } from '@/common/either'
import { EmailActivationCode } from '@/entities/email-activation/email-activation'
import { type EmailActivationCodesRepository } from '@/repositories/ports/email-activation-codes'
import { MailServiceError } from '@/usecases/errors/email-service'
import { type EmailOptions, type EmailService } from '@/usecases/ports/email-service'
import dayjs from 'dayjs'

export class SendEmailVerificationUseCase {
  public constructor (
    private readonly mailOptions: EmailOptions,
    private readonly mailService: EmailService,
    private readonly emailActivationCodesRepository: EmailActivationCodesRepository
  ) {}

  public async execute (email: string) {
    const emailActivationCodeOrError = EmailActivationCode.create({
      email,
      expiresAt: dayjs().add(30, 'minutes').toDate()
    })

    if (emailActivationCodeOrError.isLeft()) return left(emailActivationCodeOrError.value)

    const customizedHtml =
      `Insira o seguinte código para concluir seu cadastro: \n<b>${emailActivationCodeOrError.value.code}</b>`
    const options: EmailOptions = {
      ...this.mailOptions,
      to: emailActivationCodeOrError.value.email.value,
      html: customizedHtml
    }

    const sent = await this.mailService.send(options)
    if (sent.isLeft()) return left(new MailServiceError())

    return right(options)
  }
}
