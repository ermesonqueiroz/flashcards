import { type EmailActivationCodeData } from '@entities/email-activation/email-activation-data'

export interface EmailActivationCodesRepository {
  add: (data: EmailActivationCodeData) => Promise<void>
}
