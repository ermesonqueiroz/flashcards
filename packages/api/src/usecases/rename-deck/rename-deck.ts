import { left, right } from '@/common/either'
import { Deck } from '@/entities/deck'
import { type DecksRepository } from '@/repositories/ports'
import { CannotFindDeckError } from '@/usecases/errors/cannot-find-deck'
import { type RenameDeckRequest } from './rename-deck-request'
import { type RenameDeckResponse } from './rename-deck-response'

export class RenameDeckUseCase {
  public constructor (private readonly decksRepository: DecksRepository) {}

  public async execute ({ id, title }: RenameDeckRequest): Promise<RenameDeckResponse> {
    const deck = await this.decksRepository.findById(id)
    if (!deck) return left(new CannotFindDeckError(id))

    const newDeckOrError = Deck.create({ id, title })
    if (newDeckOrError.isLeft()) return left(newDeckOrError.value)

    await this.decksRepository.update(id, {
      title
    })

    return right({
      id: deck.id,
      title
    })
  }
}
