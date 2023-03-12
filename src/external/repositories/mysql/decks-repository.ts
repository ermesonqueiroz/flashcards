import { type DeckData } from '@entities/deck'
import { type DecksRepository } from '@repositories/ports'
import { type RowDataPacket } from 'mysql2'
import { MysqlHelper } from './helpers/mysql-helper'

export class MysqlDecksRepository implements DecksRepository {
  async add (deck: DeckData): Promise<void> {
    await MysqlHelper.client.query(`
      INSERT INTO
        decks (id, title)
      VALUES
        ("${deck.id}", "${deck.title}")
    ;`)
  }

  async findById (id: string): Promise<DeckData | null> {
    const [rows] = await MysqlHelper.client.query(`
      SELECT
        *
      FROM
        decks
      WHERE
        id = "${id}"
      LIMIT
        1
    ;`)

    return (rows as RowDataPacket[])[0] as DeckData
  }

  async findAll (): Promise<DeckData[]> {
    const [rows] = await MysqlHelper.client.query(`
      SELECT
        *
      FROM
        decks
    ;`)

    return (rows as RowDataPacket[]) as DeckData[]
  }
}
