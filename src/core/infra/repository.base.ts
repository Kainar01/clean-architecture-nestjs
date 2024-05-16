import { EventBus } from '@/libs/event-bus';
import { ILogger } from '@/libs/logger';

import { AggregateRoot } from '../domain/aggregate-root.base';
import { Paginated, PaginatedQueryParams, IRepository } from '../domain/repository.interface';

interface IDBService {
  $transaction<T>(handler: () => Promise<T>): Promise<T>;
}

export abstract class RepositoryBase<Aggregate extends AggregateRoot<unknown>>
  implements IRepository<Aggregate>
{
  protected constructor(
    protected readonly db: IDBService,
    protected readonly eventBus: EventBus,
    protected readonly logger: ILogger,
  ) {}

  protected abstract createImpl(entity: Aggregate): Promise<void>;

  async create(entity: Aggregate): Promise<void> {
    await this.createImpl(entity);
    await entity.publishEvents(this.logger, this.eventBus);
  }

  protected abstract updateImpl(entity: Aggregate): Promise<void>;

  async update(entity: Aggregate): Promise<void> {
    await this.updateImpl(entity);
    await entity.publishEvents(this.logger, this.eventBus);
  }

  protected abstract deleteImpl(entity: Aggregate): Promise<boolean>;

  async delete(entity: Aggregate): Promise<boolean> {
    const isDeleted = await this.deleteImpl(entity);

    if (isDeleted) {
      await entity.publishEvents(this.logger, this.eventBus);
    }

    return isDeleted;
  }

  abstract findById(id: string): Promise<Aggregate>;

  abstract findAll(): Promise<Aggregate[]>;

  abstract findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Aggregate>>;

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return this.db.$transaction(handler);
  }
}
