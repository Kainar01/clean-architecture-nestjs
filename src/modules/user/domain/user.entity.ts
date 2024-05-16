import { Entity } from '@/core/domain';

interface Props {
  email: string;
  name: string | null;
}

export class UserEntity extends Entity<Props> {
  static create(props: Props) {
    return new UserEntity({
      props,
    });
  }
}
