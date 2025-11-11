import { Module } from '@nestjs/common';
import { ExamplesService } from './examples.service';
import { ExamplesController } from './examples.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from './entities/example.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      Example
    ])
  ],
  controllers: [ExamplesController],
  providers: [ExamplesService],
})
export class ExamplesModule { }

