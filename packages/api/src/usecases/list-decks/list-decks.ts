import { type DecksRepository } from '@/repositories/ports'
import { type ListDecksResponse } from './list-decks-response'

export interface ListDecks {
  execute: () => Promise<ListDecksResponse>
}

export class ListDecksUseCase implements ListDecks {
  public constructor (private readonly decksRepository: DecksRepository) {}

  public async execute (): Promise<ListDecksResponse> {
    return await this.decksRepository.findAll()
  }
}
