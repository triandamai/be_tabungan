import { Module } from '@nestjs/common';
import { SavingService } from './saving.service';
import { SavingController } from './saving.controller';
import { schemaProviders } from 'src/database/schemas/schema.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SavingController],
  providers: [SavingService, ...schemaProviders],
})
export class SavingModule {}
