import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { EarningRepository } from './earning.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEarningAlreadyRegisteredConstraint
  implements ValidatorConstraintInterface {
  constructor(private readonly repository: EarningRepository) { }
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    console.log('validation arguments:', validationArguments);
    return !this.repository.verifyNameExists(value);
  }
}

export function IsEarningAlreadyRegistered(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEarningAlreadyRegisteredConstraint,
    });
  };
}
