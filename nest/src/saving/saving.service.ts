import { Inject, Injectable } from '@nestjs/common';
import { savingModelInterface } from 'src/database/schemas/database.schema';

@Injectable()
export class SavingService {
  constructor(
    @Inject('SAVING_MODEL') private savingModel: savingModelInterface,
  ) {}

  findAll() {
    return `This action returns all saving`;
  }

  create(createSavingDto) {
    return 'This action adds a new saving';
  }
  findOne(id: number) {
    return `This action returns a #${id} saving`;
  }

  update(id: number, updateSavingDto) {
    return `This action updates a #${id} saving`;
  }

  remove(id: number) {
    return `This action removes a #${id} saving`;
  }
}
