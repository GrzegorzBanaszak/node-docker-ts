export abstract class Entity {
  protected id: string;
  protected props: Array<string>;

  getPropsAndId(): Array<string> {
    return new Array<string>(this.id, ...this.props);
  }
}
