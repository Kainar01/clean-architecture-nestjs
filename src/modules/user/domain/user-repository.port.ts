import { IRepository } from '@/core/domain';

import { UserEntity } from './user.entity';

export interface UserRepositoryPort extends IRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
}

export const UserRepositoryPort: unique symbol = Symbol('USER_REPOSITORY');
