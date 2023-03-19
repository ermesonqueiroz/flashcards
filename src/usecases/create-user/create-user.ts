import { left, right } from '@common/either'
import { User } from '@entities/user'
import { type UsersRepository } from '@repositories/ports/users-repository'
import { randomUUID } from 'crypto'
import { type CreateUserRequest } from './create-user-request'
import { type CreateUserResponse } from './create-user-response'

export class CreateUserUseCase {
  public constructor (private readonly usersRepository: UsersRepository) {}

  public async execute ({ username, email, password }: CreateUserRequest): Promise<CreateUserResponse> {
    const id = randomUUID()
    const userOrError = User.create({
      id,
      username,
      email,
      password
    })

    if (userOrError.isLeft()) return left(userOrError.value)

    await this.usersRepository.add({
      id: userOrError.value.id.value,
      username: userOrError.value.username.value,
      email: userOrError.value.email.value,
      password: userOrError.value.password.value
    })

    return right({
      id: userOrError.value.id.value,
      username: userOrError.value.username.value,
      email: userOrError.value.email.value,
      password: userOrError.value.password.value
    })
  }
}
