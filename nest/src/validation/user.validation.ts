import { IsNotEmpty } from 'class-validator';
export class CreateUserValidation {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  uid: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  password: string;
}
export class LoginValidation {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class UIDValidation {
  @IsNotEmpty()
  uid: string;
}
