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
      code: 200,
      data: result,
      message: 'Berhasil ambil data',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    const {} = await this.userService.findOne(id);
  }

  @Get('/uid/:uid')
  async findUid(@Param('uid') params: string) {
    const data = await this.userService.findByUid(params);
  }

  @Post('/login')
  async login(@Body() user: LoginValidation) {
    const { success, payload } = await this.userService.login(user);
    if (success) return { code: 200, data: payload, message: 'Success' };
    else return { code: 400, data: [], message: '' };
  }
  @Post('/register')
  async register(@Body() user: CreateUserValidation) {
    const { success, payload } = await this.userService.create(user);
    if (success) return { code: 200, data: [payload], message: '' };
    else return { code: 400, data: [], message: '' };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: IUser) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
