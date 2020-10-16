import {ValidatorConstraint} from 'class-validator';
import {Injectable, Inject} from '@nestjs/common';

import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
  ) {}

  validate(email: string): Promise<boolean> {
    return this.userService.findOne({email}).then((user) => !user);
  }

  defaultMessage(): string {
    return 'User with this email already exists.';
  }
}