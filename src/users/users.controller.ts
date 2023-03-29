import { UsersService } from './users.service';
import {
  All,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SETTINGS } from '../utils/app.utils';
import { UserRegisterReqDto } from './dto/user-register-req.dto';
import { UserRegisterResponseDto } from './dto/user-register-response.dto';
import { UserRegisterResponseInterface } from './interface/user-register-response.interface';
import { AuthGuard as PassportGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { GqlJwtAuthGuard } from '../guards/gql-jwt-auth.guard';

@Controller('user')
export class UsersController {
  /**
   * @param userService
   * @param authService
   */
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  /**
   * All method supported route
   */
  @All('/')
  @UseGuards(PassportGuard('local'))
  getHello(@Request() request): { message: string } {
    return this.userService.getWelcome(request.user);
  }

  /**
   * All method supported route
   */
  @All('/getPassportJwtUser')
  @UseGuards(GqlJwtAuthGuard)
  getPassportJwtUser(@Request() request): { message: string } {
    return this.userService.getWelcome(request.user);
  }

  /**
   * @param data
   */
  @Post('/register')
  async register(
    @Body(SETTINGS.VALIDATION_PIPE) data: UserRegisterReqDto,
  ): Promise<UserRegisterResponseDto> {
    const user = await this.userService.registerUser(data);
    return { user: user, message: 'success', status: 200 };
  }

  /**
   * @param id
   */
  @Get(':id')
  async getUserById(
    @Param('id') id: number,
  ): Promise<UserRegisterResponseInterface> {
    const user = await this.userService.findUserById(id);
    return { status: 200, message: 'success', user: user };
  }

  @UseGuards(PassportGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
