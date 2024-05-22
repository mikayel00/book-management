import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  isPasswordValid(hashedPass: string, passToCheck: string): Promise<boolean> {
    return bcrypt.compare(hashedPass, passToCheck);
  }
}
