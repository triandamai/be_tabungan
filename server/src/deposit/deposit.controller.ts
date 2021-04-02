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
  ConfirmationDepositValidation,
  CreateDepositValidation,
} from 'src/validation/deposit.validation';
import { DepositService } from './deposit.service';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  async findAll() {
    const result = await this.depositService.findAll();
    return {
      statusCode: result.length < 1 ? 400 : 200,
      data: result,
      message: `Total Data ${result}`,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { success, payload, reason } = await this.depositService.findOne(id);
    if (success) return { statucCode: 200, data: payload, message: reason };
    else return { statusCode: 400, data: [], message: reason };
  }

  @Post('create')
  async create(@Body() createDepositDto: CreateDepositValidation) {
    const { success, payload, reason } = await this.depositService.create(
      createDepositDto,
    );
    if (success) return { statusCode: 200, data: payload, message: reason };
    else return { statusCode: 400, data: [], message: reason };
  }

  @Post('update/:id')
  async update(
    @Param('id') id: any,
    @Body() createDepositDto: CreateDepositValidation,
  ) {
    const { success, payload, reason } = await this.depositService.updated(
      id,
      createDepositDto,
    );
    if (success) return { statusCode: 200, data: payload, message: reason };
    else return { statusCode: 400, data: [], message: reason };
  }

  @Post('confirmation/:id')
  async confirmation(
    @Param('id') id: any,
    @Body() user: ConfirmationDepositValidation,
  ) {
    const { success, payload, reason } = await this.depositService.confirmation(
      id,
      user.uid,
    );
    if (success) return { statusCode: 200, data: payload, message: reason };
    else return { statusCode: 400, data: [], message: reason };
  }
}
