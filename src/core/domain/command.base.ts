export abstract class Command<T> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = props;
  }

  static isCommand(obj: unknown): obj is Command<unknown> {
    return obj instanceof Command;
  }

  getProps() {
    return this.props;
  }
}
