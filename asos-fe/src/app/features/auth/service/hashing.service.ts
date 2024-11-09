import { Injectable } from '@angular/core';
import bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class HashingService {
  private saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
