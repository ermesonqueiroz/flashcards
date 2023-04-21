import { type Id } from '@/entities/common/id'
import { type Email } from './email'
import { type Password } from './password'

export class User {
  private readonly _id: Id
  private readonly _username: string
  private readonly _email: Email
  private readonly _password: Password

  constructor (id: Id, username: string, email: Email, password: Password) {
    this._id = id
    this._username = username
    this._email = email
    this._password = password
  }

  get id (): string {
    return this._id
  }
}
