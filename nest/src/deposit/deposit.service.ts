import { Inject, Injectable, Req, Res } from '@nestjs/common';
import { ServiceResult } from 'src/common/Serviceresult';
import {
  DepositDoc,
  depositModelInterface,
} from 'src/database/schemas/database.schema';
import { CreateDepositValidation } from 'src/validation/deposit.validation';
import { CreateSavingValidation } from 'src/validation/saving.validation';

@Injectable()
export class DepositService {
  constructor(
    @Inject('DEPOSIT_MODEL') private depositModel: depositModelInterface,
  ) {}
  findAll(): Promise<DepositDoc[]> {
    return this.depositModel.find().exec();
  }

  findOne(id: string): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const deposits = await this.depositModel.find({ savingId: id });
      if (deposits.length < 1)
        resolve({ success: false, payload: [], reason: 'Not Found' });
      else
        resolve({
          success: true,
          payload: deposits,
          reason: `Total ${deposits.length}`,
        });
    });
  }

  create(create: CreateDepositValidation): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const deposit = await this.depositModel.build({
        sender: create.sender,
        savingId: create.savingId,
        nominal: create.nominal,
        receipt: create.receipt,
        accepted: '',
        type: create.type,
        receiptname: create.receiptname,
        description: create.description,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      const saved = await deposit.save();
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
  updated(id: any, create: CreateDepositValidation): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      const exist = await this.depositModel.findById(id);
      if (exist) {
        const deposit = await this.depositModel.build({
          sender: create.sender,
          savingId: create.savingId,
          nominal: create.nominal,
          receipt: create.receipt,
          accepted: '',
          type: create.type,
          receiptname: create.receiptname,
          description: create.description,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        const saved = await deposit.save();
        if (saved)
          resolve({ success: true, payload: [saved], reason: 'Success' });
        else
          resolve({
            success: false,
            payload: [],
            reason: `Failed ${saved.errors}`,
          });
      } else {
        resolve({
          success: false,
          payload: [exist],
          reason: `${exist.errors}`,
        });
      }
    });
  }
  confirmation(id: any, uid: string): Promise<ServiceResult> {
    return new Promise(async (resolve) => {
      this.depositModel.findByIdAndUpdate(
        id,
        { accepted: uid },
        { new: true },
        (err: any, result: any) => {
          if (err) resolve({ success: false, payload: [], reason: `${err}` });
          if (result)
            resolve({ success: true, payload: [result], reason: `Success` });
        },
      );
    });
  }
}
