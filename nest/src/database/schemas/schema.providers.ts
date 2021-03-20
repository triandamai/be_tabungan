import { Connection } from 'mongoose';
import { User, Saving, Deposit } from './database.schema';

export const schemaProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => User,
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'SAVING_MODEL',
    useFactory: (connection: Connection) => Saving,
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'DEPOSIT_MODEL',
    useFactory: (connection: Connection) => Deposit,
    inject: ['DATABASE_CONNECTION'],
  },
];
