import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { schemaProviders } from 'src/database/schemas/schema.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DepositController],
  providers: [DepositService, ...schemaProviders],
})
export class DepositModule {}
