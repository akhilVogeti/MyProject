import { Injectable ,  ForbiddenException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  createTask(taskData: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(taskData);
    return newTask.save();
  }

  findAllTasks(loggedInUserId: string): Promise<Task[]> {
    return this.taskModel.find({userId: loggedInUserId}).exec();
  }

  async findOneTask(id: string, loggedInUserId: string ): Promise<Task> {
    const existingTask = await this.taskModel.findById(id).exec();
    if(existingTask.userId === loggedInUserId) {
      return existingTask
    }
    else{
      throw new ForbiddenException({
          statusCode: 403,
          message: 'Access Denied',
        });
    }

  }

  async updateTask(id: string, taskData: CreateTaskDto, loggedInUserId: string): Promise<Task> {
    const existingTask = await this.taskModel.findById(id).exec();
    if(existingTask.userId === loggedInUserId) {
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, taskData, { new: true });
        return updatedTask;
    }
    else{
        throw new ForbiddenException({
            statusCode: 403,
            message: 'Access Denied',
          });
    }
 }

  async removeTask(id: string, loggedInUserId: string): Promise<void> {
    const existingTask = await this.taskModel.findById(id).exec();
    if(existingTask.userId === loggedInUserId) {
        await this.taskModel.findByIdAndDelete(id);
    }
    else {
        throw new ForbiddenException({
            statusCode: 403,
            message: 'Access Denied',
          });
    }
 }
}
