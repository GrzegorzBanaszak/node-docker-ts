import {
  Connection,
  createConnection,
  QueryError,
  RowDataPacket,
} from "mysql2/promise";

export class Client {
  private static instance: Client;
  private conn: Connection;
  private constructor() {
    createConnection({
      host: "localhost",
      user: "admin",
      password: "Admin123",
      port: 13306,
      database: "db",
    }).then((conn) => {
      this.conn = conn;
    });
  }

  public static getInstancion(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }

    return Client.instance;
  }

  public async query(queryString: string) {
    const [rows, fields] = await this.conn.query(queryString);

    return rows;
  }
}
