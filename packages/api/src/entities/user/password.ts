import { type Either, left, right } from '@/common/either'
import { InvalidPasswordError } from '@/entities/errors/user'

export class Password {
  private readonly password: string

  private constructor (password: string) {
    this.password = password
  }

  static create (password: string): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password))
    }

    return right(new Password(password))
  }

  static validate (password: string): boolean {
    const tester = /^(?=.*\d)[\w\d]{8,}$/

    if (!password && !tester.test(password)) { return false }

    return true
  }

  get value (): string {
    return this.password
  }
}
