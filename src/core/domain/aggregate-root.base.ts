import { EventBus } from '@/libs/event-bus';
import { ILogger } from '@/libs/logger';

import { DomainEvent } from './domain-event.base';
import { BaseEntityProps, CreateEntityProps, Entity } from './entity.base';

type CreateAggregateRootProps<EntityProps> = CreateEntityProps<EntityProps> & {
  version?: number;
};

type BaseAggregateRootProps = BaseEntityProps & {
  version: number;
};

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  version: number;

  constructor({ version, ...props }: CreateAggregateRootProps<EntityProps>) {
    super(props);
    this.version = version || 1;
  }

  private domainEvents: DomainEvent[] = [];

  public getProps(): EntityProps & BaseAggregateRootProps {
    return {
      ...super.getProps(),
      version: this.version,
    };
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this.domainEvents = [];
  }

  public getEvents() {
    return this.domainEvents;
  }

  public async publishEvents(logger: ILogger, eventBus: EventBus): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(
          `"${event.constructor.name}" event published for aggregate ${this.constructor.name} : ${this.id}`,
        );
        return eventBus.publish(event);
      }),
    );
    this.clearEvents();
  }
}
