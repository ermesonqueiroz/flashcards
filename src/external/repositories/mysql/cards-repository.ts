import { type CardData } from '@entities/card'
import { type CardsRepository } from '@repositories/ports'
import { type RowDataPacket } from 'mysql2'
import { MysqlHelper } from './helpers/mysql-helper'

export class MysqlCardsRepository implements CardsRepository {
  async add (card: CardData): Promise<void> {
    await MysqlHelper.client.query(`
      INSERT INTO
        cards (id, deck_id, term, definition)
      VALUES
        ("${card.id}", "${card.deckId}", "${card.term}", "${card.definition}")
    ;`)
  }

  async findByDeckId (deckId: string): Promise<CardData[]> {
    const [rows] = await MysqlHelper.client.query(`
      SELECT
        *
      FROM
        cards
      WHERE
        deck_id = "${deckId}"
    ;`)

    return (rows as RowDataPacket[]).map(row => ({
      id: row.id,
      term: row.term,
      definition: row.definition,
      deckId: row.deck_id
    }))
  }
}
