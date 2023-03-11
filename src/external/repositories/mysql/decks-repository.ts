import { type DeckData } from '@entities/deck'
import { type DecksRepository } from '@repositories/ports'
import { MysqlHelper } from './helpers/mysql-helper'

export class MysqlDecksRepository implements DecksRepository {
  async add (deck: DeckData): Promise<void> {
    MysqlHelper.client.query(`
      INSERT INTO
        decks (id, title)
      VALUES
        ("${deck.id}", "${deck.title}")
    ;`)
  }
}
