import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://Trian:asdf1998Buka@cluster0.ewqld.gcp.mongodb.net/db_tabungan?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
      ),
  },
];
