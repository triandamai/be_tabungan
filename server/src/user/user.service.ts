import { Inject, Injectable } from '@nestjs/common';
import { ServiceResult } from 'src/common/Serviceresult';

import {
  UserDoc,
  userModelInterface,
  IUser,
  savingModelInterface,
  depositModelInterface,
} from 'src/database/schemas/database.schema';
import {
  CreateUserValidation,
  LoginValidation,
} from 'src/validation/user.validation';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: userModelInterface,
    @Inject('SAVING_MODEL') private savingModel: savingModelInterface,
    @Inject('DEPOSIT_MODEL') private depositModel: depositModelInterface,
  ) {}

  findAll(): Promise<UserDoc[]> {
    return this.userModel.find().exec();
  }
  getProfil(uid: string): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const user = await this.userModel.findOne({ uid: uid });

      if (!user) {
        resolve({
          success: false,
          payload: [],
          reason: `Failed ${user}`,
        });
      } else {
        const saving = await this.savingModel.findOne({ userId: user.uid });
        if (saving) {
          const count = await this.depositModel.aggregate([
            {
              $match: {
                savingId: saving.savingId,
              },
            },
            {
              $group: {
                _id: null,
                savingId: {
                  $first: '$savingId',
                },
                total: {
                  $sum: '$nominal',
                },
              },
            },
          ]);
          return resolve({
            success: true,
            payload: [
              {
                user: user,
                saving: saving,
                count: count,
              },
            ],
          });
        } else {
          return resolve({
            success: true,
            payload: [
              {
                user: user,
                saving: null,
                count: [],
              },
            ],
          });
        }
      }
    });
  }
  login(user: LoginValidation): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const data = await this.userModel.findOne({
        email: user.email,
        password: user.password,
      });

      if (data) resolve({ success: true, payload: [data], reason: 'Ok' });
      else resolve({ success: false, payload: [], reason: 'Failed' });
    });
  }
  create(createUserDto: CreateUserValidation): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const model = this.userModel.build({
        uid: createUserDto.uid,
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        gender: createUserDto.gender,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      const saved = await model.save();
      if (saved)
        resolve({ success: true, payload: [saved], reason: 'Success' });
      else
        resolve({
          success: false,
          payload: [],
          reason: `Failed ${saved.errors}`,
        });
    });
  }
}
