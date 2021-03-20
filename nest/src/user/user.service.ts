import { Inject, Injectable } from '@nestjs/common';
import { ServiceResult } from 'src/common/Serviceresult';

import {
  UserDoc,
  userModelInterface,
  IUser,
} from 'src/database/schemas/database.schema';
import {
  CreateUserValidation,
  LoginValidation,
} from 'src/validation/user.validation';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: userModelInterface) {}

  findAll(): Promise<UserDoc[]> {
    return this.userModel.find().exec();
  }

  findOne(id: any) {
    return this.userModel.findById(id);
  }

  findByUid(uid: any) {
    return this.userModel.find({ uid: uid });
  }
  login(user: LoginValidation): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const data = await this.userModel.find({
        email: user.email,
        password: user.password,
      });

      if (data.length > 0)
        resolve({ success: true, payload: data, reason: 'Ok' });
      else resolve({ success: false });
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
      if (saved) resolve({ success: true, payload: saved, reason: 'Success' });
      else resolve({ success: false });
    });
  }
  update(id: any, updateUserDto: IUser) {
    return {};
  }

  remove(id: any) {
    return this.userModel.findByIdAndRemove(id);
  }
}
