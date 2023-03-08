import { UserService } from './user.service';
import { All, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SETTINGS } from '../utils/app.utils';
import { UserRegisterReqDto } from './dto/user-register-req.dto';
import { UserRegisterResponseDto } from './dto/user-register-response.dto';
import { UserRegisterResponseInterface } from './interface/user-register-response.interface';

@Controller('user')
export class UserController {
  /**
   * @param userService
   */
  constructor(private userService: UserService) {}

  /**
   * All method supported route
   */
  @All('/')
  getHello(): { message: string } {
    return this.userService.getWelcome();
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
}
