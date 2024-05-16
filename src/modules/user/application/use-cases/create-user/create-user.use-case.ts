import { Injectable } from '@nestjs/common';

import { UseCase } from '@/core/domain';
import { UserRepositoryPort } from '@/modules/user/domain/user-repository.port';
import { UserEntity } from '@/modules/user/domain/user.entity';

import { UserAlreadyExistsApplicationError } from '../../errors/user-already-exists.application-error';

interface Props {
  email: string;
  name: string;
}

@Injectable()
export class CreateUserUseCase implements UseCase<Props, UserEntity> {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(props: Props): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(props.email);

    if (existingUser) {
      throw new UserAlreadyExistsApplicationError();
    }

    const user = UserEntity.create({
      name: props.name,
      email: props.email,
    });

    await this.userRepository.create(user);

    return user;
  }
}
