import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task,TaskDocument} from './tasks.schema'
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
@Injectable()
export class TasksService {
    @InjectModel(Task.name)
    private taskModel = Model<TaskDocument>
    async findAll(){
        const tasks = await this.taskModel.find()
        if (!tasks){
            throw new NotFoundException('Not found')
        }
        return tasks
    }
    async findOne(id){
        const task=await this.taskModel.findOne({_id:id})
        if (!task){
            throw new NotFoundException(`Not found id:${id}`)
        }
        return task
    }
    async create(task:CreateTaskDto){
        return this.taskModel.create(task)
    }
    async update(id,userUpdate:UpdateTaskDto){
        const updated= await this.taskModel.findByIdAndUpdate(
            id,userUpdate,
            {returnDocument:'after',runValidators:true}
        )
        if (!updated){
            throw new NotFoundException(`Not found id:${id}`)
        }
        return updated
    }
    async delete(id){
        const task =  await this.taskModel.findByIdAndDelete(id)
        if (!task){
            throw new NotFoundException(`Not found id:${id}`)
        }
        return task
        
    }
}
