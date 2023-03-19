import { type UserData } from '@entities/user'

export interface UsersRepository {
  add: (user: UserData) => Promise<void>
}
