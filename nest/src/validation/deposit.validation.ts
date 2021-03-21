import { IsNotEmpty } from 'class-validator';

export class CreateDepositValidation {
  @IsNotEmpty()
  savingId: string;
  @IsNotEmpty()
  sender: string;
  @IsNotEmpty()
  nominal: Number;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  accepted: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  receipt: string;
  @IsNotEmpty()
  receiptname: string;
}

export class ConfirmationDepositValidation {
  @IsNotEmpty()
  uid: string;
}
