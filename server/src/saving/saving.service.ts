import { Inject, Injectable } from '@nestjs/common';
import { ServiceResult } from 'src/common/Serviceresult';
import {
  SavingDoc,
  savingModelInterface,
} from 'src/database/schemas/database.schema';
import {
  CreateSavingValidation,
  JoinSavingValidation,
} from '../validation/saving.validation';

@Injectable()
export class SavingService {
  constructor(
    @Inject('SAVING_MODEL') private savingModel: savingModelInterface,
  ) {}

  findAll(): Promise<SavingDoc[]> {
    return this.savingModel.find().exec();
  }

  create(createSavingDto: CreateSavingValidation): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      //check if saving already exist
      const exist = await this.savingModel.findOne({
        savingId: createSavingDto.savingId,
      });
      //exist
      if (!exist) {
        //create new savings
        const create = await this.savingModel.build({
          savingId: createSavingDto.savingId,
          userId: createSavingDto.userId,
          description: createSavingDto.description,
          createdBy: createSavingDto.createdBy,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        const saved = await create.save();
        //success create
        if (saved)
          return resolve({
            success: true,
            payload: [saved],
            reason: 'Savings saved',
          });
        else
          return resolve({
            success: false,
            payload: [],
            reason: 'savings Not Saved',
          });
      } else {
        resolve({ success: false, payload: [], reason: 'Saving Is Exist' });
      }
    });
  }
  join(join: JoinSavingValidation): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const exist = await this.savingModel.findOne({ userId: join.ownerId });
      if (exist) {
        const builder = await this.savingModel.build({
          savingId: join.savingId,
          userId: join.userId,
          createdBy: join.ownerId,
          description: exist.description,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        const created = await builder.save();
        if (created) {
          resolve({
            success: true,
            payload: [created],
            reason: 'Success Joining',
          });
        } else {
          resolve({
            success: false,
            payload: [],
            reason: `${created.errors.message}`,
          });
        }
      } else {
        //
        resolve({
          success: false,
          payload: [],
          reason: 'Savings Doesn"t Exist',
        });
      }
    });
  }
  findId(id): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const saving = await this.savingModel.find({ userId: id });
      if (saving.length < 1)
        return resolve({
          success: false,
          payload: [],
          reason: `not found ${saving}`,
        });
      else
        return resolve({
          success: true,
          payload: saving,
          reason: `Count ${saving.length}`,
        });
    });
  }
}
