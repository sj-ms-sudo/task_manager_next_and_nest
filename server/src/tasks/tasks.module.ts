import * as dotenv from 'dotenv'
dotenv.config();
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import {TaskSchema,Task} from './tasks.schema';
@Module({
  imports:[MongooseModule.forRoot(process.env.MONGO!),MongooseModule.forFeature([{name:Task.name,schema:TaskSchema}])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
