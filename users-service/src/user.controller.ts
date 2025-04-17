import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ pattern: 'get_user' })
  handleGetUser(data: { id: string }) {
    return this.userService.getUser(data.id);
  }
}
