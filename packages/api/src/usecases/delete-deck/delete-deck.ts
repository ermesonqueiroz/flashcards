import { left, right } from '@common/either'
import { type DecksRepository } from '@repositories/ports'
import { CannotFindDeckError } from '@usecases/errors/cannot-find-deck'
import { type DeleteDeckRequest } from './delete-deck-request'
import { type DeleteDeckResponse } from './delete-deck-response'

export class DeleteDeckUseCase {
  public constructor (private readonly decksRepository: DecksRepository) {}

  public async execute ({ id }: DeleteDeckRequest): Promise<DeleteDeckResponse> {
    const deck = await this.decksRepository.findById(id)

    if (!deck) return left(new CannotFindDeckError(id))

    await this.decksRepository.delete(id)
    return right(deck)
  }
}
