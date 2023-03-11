import mysql, { type Connection } from 'mysql2'

export const MysqlHelper = {
  client: {} as Connection,
  connect (uri: string) {
    this.client = mysql.createConnection(uri)
  },
  disconnect () {
    this.client.end()
  }
}
