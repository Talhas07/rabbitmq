import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async validateUser(id: string) {
    try {
      const response = await lastValueFrom(
        this.client.send({ pattern: 'get_user' }, { id }), // Send `id` as an object
      );
      return response;
    } catch (error) {
      console.error('Error calling user service:', error);
      throw error;
    }
  }
}
