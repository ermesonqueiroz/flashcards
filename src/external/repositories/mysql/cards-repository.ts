import { type CardData } from '@entities/card'
import { type CardsRepository } from '@repositories/ports'
import { MysqlHelper } from './helpers/mysql-helper'

export class MysqlCardsRepository implements CardsRepository {
  async add (card: CardData): Promise<void> {
    MysqlHelper.client.query(`
      INSERT INTO
        cards (id, deck_id, term, definition)
      VALUES
        ("${card.id}", "${card.deckId}", "${card.term}", "${card.definition}")
    ;`)
  }
}
