import { Module, forwardRef } from '@nestjs/common';
import { BuysellController } from './buysell.controller';
import { BuysellService } from './buysell.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Buysell } from './buysell.model';
import { EventsModule } from 'src/events/events.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Buysell]),
    forwardRef(() => EventsModule),
    UserModule,
  ],
  controllers: [BuysellController],
  providers: [BuysellService],
  exports: [BuysellService],
})
export class BuysellModule {}
