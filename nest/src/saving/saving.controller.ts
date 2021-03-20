import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SavingService } from './saving.service';

@Controller('saving')
export class SavingController {
  constructor(private readonly savingService: SavingService) {}

  @Get()
  findAll() {
    return this.savingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savingService.findOne(+id);
  }
  @Get()
  async count() {}

  @Post()
  create(@Body() createSavingDto) {
    return this.savingService.create(createSavingDto);
  }
  @Post()
  async deposit() {}
  @Post()
  async confirmation() {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavingDto) {
    return this.savingService.update(+id, updateSavingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savingService.remove(+id);
  }
}
