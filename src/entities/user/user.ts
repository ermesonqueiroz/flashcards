import { left, right, type Either } from '@common/either'
import { InvalidUsernameError } from '@entities/errors/user/invalid-username'
import { type UserData } from './user-data'
import { Id } from '@entities/common/id'
import { Username } from './username'
import { Email } from './email'
import { Password } from './password'
import { InvalidIdError } from '@entities/errors/id'
import { InvalidEmailError } from '@entities/errors/user/invalid-email'
import { InvalidPasswordError } from '@entities/errors/user/invalid-password'

export class User {
  public readonly id: Id
  public readonly username: Username
  public readonly email: Email
  public readonly password: Password

  private constructor (id: Id, username: Username, email: Email, password: Password) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
  }

  public static create ({ id, username, email, password }: UserData): Either<InvalidIdError | InvalidUsernameError | InvalidEmailError | InvalidPasswordError, User> {
    const idOrError = Id.create(id)
    const usernameOrError = Username.create(username)
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)

    if (idOrError.isLeft()) return left(new InvalidIdError(id))
    if (usernameOrError.isLeft()) return left(new InvalidUsernameError(username))
    if (emailOrError.isLeft()) return left(new InvalidEmailError(email))
    if (passwordOrError.isLeft()) return left(new InvalidPasswordError(email))

    return right(
      new User(
        idOrError.value,
        usernameOrError.value,
        emailOrError.value,
        passwordOrError.value
      )
    )
  }
}
