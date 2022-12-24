import { Props } from "../types/Props";

export abstract class Entity {
  protected id: string;
  protected props: Props;

  protected constructor(id: string, props: Props) {
    this.id = id;
    this.props = props;
  }

  getId(): string {
    return this.id;
  }

  getPropsAndId(): Array<string> {
    return new Array<string>(this.id, ...this.getPropsArray());
  }

  getPropsArray(): Array<string> {
    const propsValues = Object.getOwnPropertyNames(this.props);
    return propsValues;
  }
}
