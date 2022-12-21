import { Props } from "../types/Props";

export abstract class Entity {
  protected id: string;
  protected props: Props;

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
