import { type Either, left, right } from '@common/either'
import { MailServiceError } from '@usecases/errors/email-service'
import { type EmailService, type EmailOptions } from '@usecases/ports/email-service'
import * as nodemailer from 'nodemailer'

export class NodemailerEmailService implements EmailService {
  public async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    try {
      const transporter = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        auth: {
          user: options.username,
          pass: options.password
        }
      })
      await transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      })
    } catch (error) {
      return left(new MailServiceError())
    }
    return right(options)
  }
}
