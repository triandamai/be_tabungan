import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IUser } from 'src/database/schemas/database.schema';
import {
  CreateUserValidation,
  LoginValidation,
  UIDValidation,
} from 'src/validation/user.validation';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const result = await this.userService.findAll();

    return {
      statusCode: result.length < 1 ? 400 : 200,
      data: result,
      message: `Total Data ${result.length}`,
    };
  }

  @Post('/login')
  async login(@Body() user: LoginValidation) {
    const { success, payload } = await this.userService.login(user);
    if (success)
      return {
        statusCode: payload.length < 1 ? 400 : 200,
        data: payload,
        message: 'email atau password tidak dikenal',
      };
    else return { code: 400, data: [], message: '' };
  }
  @Post('/register')
  async register(@Body() user: CreateUserValidation) {
    const { success, payload } = await this.userService.create(user);
    if (success) return { statusCode: 200, data: payload, message: '' };
    else return { statusCode: 400, data: [], message: '' };
  }

  @Get('/profile/:uid')
  async getProfil(@Param('uid') id: string) {
    const { success, payload, reason } = await this.userService.getProfil(id);
    if (success) return { statusCode: 200, data: payload, message: '' };
    else return { statusCode: 400, data: payload, message: reason };
  }
}
