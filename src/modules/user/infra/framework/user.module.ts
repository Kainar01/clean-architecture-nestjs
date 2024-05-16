import { Module } from '@nestjs/common';

import { USER_USE_CASES } from '../../application/use-cases';
import { UserRepositoryPort } from '../../domain/user-repository.port';
import { UserController } from '../../presentation/user.controller';
import { PrismaUserRepositoryAdapter } from '../repositories/prisma-user-repository.adapter';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepositoryPort,
      useValue: PrismaUserRepositoryAdapter,
    },
    ...USER_USE_CASES,
  ],
})
export class UserModule {}
