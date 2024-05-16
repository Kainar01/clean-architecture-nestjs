export type DomainEventProps<T> = T & {
  aggregateId: string;
};

export abstract class DomainEvent {
  public readonly aggregateId: string;

  constructor(props: DomainEventProps<unknown>) {
    this.aggregateId = props.aggregateId;
  }
}
