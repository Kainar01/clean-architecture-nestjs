import { DomainEvent } from '@/core/domain';

import { EVENTS_HANDLER_METADATA } from './event-bus.di-tokens';

export const EventsHandler =
  (...events: (new (...args: any[]) => DomainEvent)[]): ClassDecorator =>
  (target: object) => {
    Reflect.defineMetadata(EVENTS_HANDLER_METADATA, events, target);
  };
