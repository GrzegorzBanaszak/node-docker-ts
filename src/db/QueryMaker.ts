export class QueryMaker {
  id: string;
  params: Array<string>;
  table: string;

  constructor(id: string, params: Array<string>, table: string) {
    this.id = id;
    this.params = params;
    this.table = table;
  }

  private getPropsAndId(): Array<string> {
    return new Array<string>(this.id, ...this.params);
  }

  getAllQuery(): string {
    return `SELECT ${this.getPropsAndId()} FROM ${this.table}`;
  }

  getByIdQuery(requestId: string): string {
    return `SELECT ${this.getPropsAndId()} FROM ${this.table} WHERE ${
      this.id
    }=${requestId}`;
  }

  addQuery<T>(data: T): string {
    const values = Object.values(data);

    return `INSERT INTO ${this.table} (${this.params}) VALUES (${values.map(
      (i) => `'${i}'`
    )})`;
  }
}
