import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class UserService {
  getUser(id: string) {
    return { id, name: 'John Doe' };
  }

  @MessagePattern({ pattern: 'get_user' })
  handleGetUser(data: { id: string }) {
    return this.getUser(data.id);
  }
}
