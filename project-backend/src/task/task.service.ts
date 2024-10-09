import { Injectable ,  ForbiddenException, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(taskData);
    const task = await newTask.save();
    return task;
  }

  async findAllTasks(loggedInUserId: string): Promise<Task[]> {
    const tasks : Task[] = await this.taskModel.find({userId: loggedInUserId}).exec();
    return tasks;
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
    if(existingTask.userId.toString() === loggedInUserId.toString()) { //for some reason this doesnt work without toString()
        const taskBody = {
          title: taskData.title,
          description: taskData.description,
          completed: taskData.completed,
          userId:taskData.userId
        }
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, taskBody, { new: true });
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
    if(existingTask.userId.toString() === loggedInUserId) {
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
