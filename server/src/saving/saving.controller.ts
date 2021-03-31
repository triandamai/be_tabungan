import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateSavingValidation,
  JoinSavingValidation,
} from 'src/validation/saving.validation';
import { SavingService } from './saving.service';

@Controller('saving')
export class SavingController {
  constructor(private readonly savingService: SavingService) {}

  @Get()
  async findAll() {
    const result = await this.savingService.findAll();
    return {
      statusCode: result.length < 1 ? 400 : 200,
      data: result,
      message: `Total Data ${result.length}`,
    };
  }

  @Get(':uid')
  async findOne(@Param('uid') id: string) {
    const { success, payload } = await this.savingService.findId(id);
    if (success)
      return {
        statusCode: payload.length < 1 ? 400 : 200,
        data: payload,
        message: `Total Data ${payload.length}`,
      };
    else
      return {
        statusCode: 400,
        data: [],
        message: `Total Data ${payload.length}`,
      };
  }

  @Post('/create')
  async create(@Body() createSavingDto: CreateSavingValidation) {
    const { success, payload, reason } = await this.savingService.create(
      createSavingDto,
    );
    if (success) return { statusCode: 200, data: payload, message: reason };
    else return { statusCode: 400, data: [], message: reason };
  }
  @Post('/join')
  async join(@Body() join: JoinSavingValidation) {
    const { success, payload, reason } = await this.savingService.join(join);
    if (success) return { statusCode: 200, data: payload, message: reason };
    else return { statusCode: 400, data: [], message: reason };
  }
}
