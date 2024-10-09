import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto.username, createUserDto.password);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.validateUser(createUserDto.username, createUserDto.password);
    const access_token = await this.authService.login(user);
    return {access_token};
  }
}
