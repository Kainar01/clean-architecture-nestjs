import { IBusinessRule } from './business-rule.interface';
import { DomainError } from './domain-error.base';

export const checkRules = (...rules: IBusinessRule[]): void => {
  const errors: DomainError[] = [];
  for (const rule of rules) {
    if (rule.isBroken()) errors.push(rule.getError());
  }
  if (errors.length > 0) throw errors[0];
};
