import { PaginatedQueryParams, Paginated } from '@/core/domain';
import { RepositoryBase } from '@/core/infra';
import { UserRepositoryPort } from '@/modules/user/domain/user-repository.port';
import { UserEntity } from '@/modules/user/domain/user.entity';

export class PrismaUserRepositoryAdapter
  extends RepositoryBase<UserEntity>
  implements UserRepositoryPort
{
  async findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  protected async createImpl(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected async updateImpl(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected async deleteImpl(entity: UserEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<UserEntity>> {
    throw new Error('Method not implemented.');
  }
}
