import { Body, Controller, Get, Post, Request as Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dtos/RegisterUser.dto';
import { LoginUserDTO } from './dtos/LoginUser.dto';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserData: RegisterUserDTO) {
    return this.authService.registerUser(registerUserData);
  }

  @Post('login')
  async login(@Body() loginUserData: LoginUserDTO) {
    return this.authService.loginUser(loginUserData.email, loginUserData.password);
  }


  @UseGuards(JwtAuthGuard)
@Get('logged-in-user')
async loggedInUser(@Req() req) {
  console.log('Request received:', req.user);  // Check if user is coming through the request
  return { message: 'Logged in successfully', user: req.user };
}

}
