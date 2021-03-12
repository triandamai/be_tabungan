import { Schema, model, Model, Document } from "mongoose";

interface IUser {
  name: string;
  email: string;
  uid: string;
  created: Number;
  updated: Number;
}
interface ITabungan {
  sender: string;
  nominal: Number;
  accepted: string;
  description: string;
  receipt: string;
  receiptname: string;
  created: Number;
  updated: Number;
}
interface userModelInterface extends Model<UserDoc> {
  build(attr: IUser): UserDoc;
}
interface tabunganModelInterface extends Model<TabunganDoc> {
  build(attr: ITabungan): TabunganDoc;
}
interface UserDoc extends Document {
  name: string;
  email: string;
  uid: string;
  created: Number;
  updated: Number;
}
interface TabunganDoc extends Document {
  sender: string;
  nominal: Number;
  accepted: string;
  description: string;
  receipt: string;
  receiptname: string;
  created: Number;
  updated: Number;
}
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  created: {
    type: Number
  },
  updated: {
    type: String
  }
});
const tabunganSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  nominal: {
    type: Number,
    required: true
  },
  accepted: { type: String },
  description: { type: String },
  receipt: { type: String },
  receiptname: { type: String },
  created: { type: Number },
  updated: { type: Number }
});
userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};
tabunganSchema.statics.build = (attr: ITabungan) => {
  return new Tabungan(attr);
};

const User = model<UserDoc, userModelInterface>("User", userSchema);
const Tabungan = model<TabunganDoc, tabunganModelInterface>(
  "Tabungan",
  tabunganSchema
);

export { User, Tabungan };
