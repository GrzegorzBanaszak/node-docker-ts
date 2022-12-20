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

  public async getAll(queryType: Array<string>, table: string) {
    const queryString = `SELECT ${queryType} FROM ${table}`;

    const [rows, fields] = await this.conn.query(queryString);

    return rows;
  }

  public async getById(
    id: string,
    idType: string,
    queryType: Array<string>,
    table: string
  ) {
    const queryString = `SELECT ${queryType} FROM ${table} WHERE ${idType}=${id}`;

    const [rows, fields] = await this.conn.query(queryString);

    return rows[0];
  }
}
