import mysql, { type Connection } from 'mysql2/promise'

export const MysqlHelper = {
  client: {} as Connection,
  async connect (uri: string) {
    this.client = await mysql.createConnection(uri)
  },
  async disconnect () {
    await this.client.end()
  }
}
