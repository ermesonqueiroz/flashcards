import { type Either } from '@common/either'
import { type InvalidIdError } from '@entities/errors/id'
import { type InvalidEmailError } from '@entities/errors/user/invalid-email'
import { type InvalidPasswordError } from '@entities/errors/user/invalid-password'
import { type InvalidUsernameError } from '@entities/errors/user/invalid-username'
import { type UserData } from '@entities/user'

export type CreateUserResponse = Either<InvalidIdError | InvalidUsernameError | InvalidEmailError | InvalidPasswordError, UserData>
