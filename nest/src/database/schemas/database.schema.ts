import { Schema, Document, Model, model } from 'mongoose';
export interface IUser {
  name: string;
  email: string;
  uid: string;
  gender: string;
  password: string;
  createdAt: Number;
  updatedAt: Number;
}

export interface UserDoc extends Document {
  name: string;
  email: string;
  uid: string;
  gender: string;
  password: string;
  created: Number;
  updated: Number;
}
export interface userModelInterface extends Model<UserDoc> {
  build(attr?: IUser): UserDoc;
}

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: String,
  },
});

/**
 * tab
 */

export interface IDeposit {
  savingId: string;
  sender: string;
  nominal: Number;
  type: string;
  accepted: string;
  description: string;
  receipt: string;
  receiptname: string;
  createdAt: Number;
  updatedAt: Number;
}
export interface DepositDoc extends Document {
  savingId: string;
  sender: string;
  nominal: Number;
  type: string;
  accepted: string;
  description: string;
  receipt: string;
  receiptname: string;
  created: Number;
  updated: Number;
}

export interface depositModelInterface extends Model<DepositDoc> {
  build(attr: IDeposit): DepositDoc;
}

export const depositSchema = new Schema({
  savingId: { type: String, required: true },
  sender: {
    type: String,
    required: true,
  },
  nominal: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  accepted: { type: String },
  description: { type: String },
  receipt: { type: String },
  receiptname: { type: String },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});
/**
 * saving
 */
export interface ISaving {
  savingId: string;
  userId: string;
  description: string;
  createdBy: string;
  createdAt: Number;
  updatedAt: Number;
}
export interface SavingDoc extends Document {
  savingId: string;
  userId: string;
  description: string;
  createdBy: string;
  createdAt: Number;
  updatedAt: Number;
}
export interface savingModelInterface extends Model<SavingDoc> {
  build(attr: ISaving): SavingDoc;
}

export const savingSchema = new Schema({
  savingId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: { type: String },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});
userSchema.statics.build = (attr: IUser) => new User(attr);
depositSchema.statics.build = (attr: IDeposit) => new Deposit(attr);
savingSchema.statics.build = (attr: ISaving) => new Saving(attr);

const User = model<UserDoc, userModelInterface>('User', userSchema);
const Saving = model<SavingDoc, savingModelInterface>('Saving', savingSchema);
const Deposit = model<DepositDoc, depositModelInterface>(
  'Deposit',
  depositSchema,
);

export { User, Saving, Deposit };
