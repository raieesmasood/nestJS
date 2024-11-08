import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDTO } from './dtos/RegisterUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post("register")
  async register(@Body() registerUserData: RegisterUserDTO) {
      return this.authService.registerUser(registerUserData)
  }

  @Post("login")
  async login() {

  }

  @Post("logged-in-user")
  async currentUser() {

  }
}
