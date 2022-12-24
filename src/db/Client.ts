import { Connection, ResultSetHeader, createConnection } from "mysql2/promise";

export class Client {
  private static instance: Client;
  private conn: Connection;
  private constructor() {
    createConnection({
      host: "host.docker.internal",
      user: "admin",
      password: "Admin123",
      port: 13306,
      database: "firma",
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

  /**
   * Return resultat after insertion a new data
   */
  public async singleQuery(queryString: string): Promise<ResultSetHeader> {
    const [rows, fields] = await this.conn.query<ResultSetHeader>(queryString);

    return rows;
  }
}
