import { Entity } from './entity.base';

export interface Mapper<DomainEntity extends Entity<any>, DbRecord, Response = any> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: DbRecord): DomainEntity;
  toResponse(entity: DomainEntity): Response;
}
