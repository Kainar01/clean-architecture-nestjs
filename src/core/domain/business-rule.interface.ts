import { DomainError } from './domain-error.base';

export interface IBusinessRule {
  getError(): DomainError;
  isBroken(): boolean;
}
