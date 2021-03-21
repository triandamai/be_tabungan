import { IsNotEmpty } from 'class-validator';
export class CreateSavingValidation {
  @IsNotEmpty()
  savingId: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  createdBy: string;
}
export class JoinSavingValidation {
  @IsNotEmpty()
  savingId: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  ownerId: string;
}
