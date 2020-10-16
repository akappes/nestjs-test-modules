import { Controller, Body, Post, UseGuards, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthenticationDto } from './dto/user-authentication.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body(new ValidationPipe()) userAuthenticationDto: UserAuthenticationDto): Promise<any> {
    return this.authService.login(userAuthenticationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}