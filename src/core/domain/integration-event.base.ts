export type IntegrationEventProps<T> = Omit<T, 'occuredOn'> & {
  aggregateId: string;
};

export abstract class IntegrationEvent {
  public readonly aggregateId: string;
  public readonly occuredOn: Date;

  constructor(props: IntegrationEventProps<unknown>) {
    this.aggregateId = props.aggregateId;
    this.occuredOn = new Date();
  }
}
