import { left, right, type Either } from '@common/either'
import { InvalidPasswordError } from '@entities/errors/user/invalid-password'
import { genSaltSync, hashSync } from 'bcrypt'

export class Password {
  private readonly hash: string

  private constructor (hash: string) {
    this.hash = hash
  }

  public static create (password: string): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) return left(new InvalidPasswordError(password))

    return right(
      new Password(
        Password.hash(password)
      )
    )
  }

  public static hash (password: string): string {
    const salt = genSaltSync(10)
    return hashSync(password, salt)
  }

  public static validate (password: string): boolean {
    // At least one upper case letter
    // At least one lower case letter
    // At least one special character
    // Minimum eight in length

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])(?!.*\s).{8,}$/
    return regex.test(password)
  }

  get value (): string {
    return this.hash
  }
}
