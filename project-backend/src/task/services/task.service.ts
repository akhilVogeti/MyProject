import { Injectable ,  ForbiddenException, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schema/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    try{
      const newTask = new this.taskModel(taskData);
      const task = await newTask.save();
      return task;
    } catch(error){
      console.log('error in creating a task', error);
    }
  }

  async findAllTasks(loggedInUserId: string): Promise<Task[]> {
    try{
      const tasks : Task[] = await this.taskModel.find({userId: loggedInUserId}).exec();
      return tasks;
    } catch(error) {
      console.log('error in fetching all tasks', error);
    }
  }

  async findOneTask(taskId: string): Promise<Task> {
    try{
      const existingTask = await this.taskModel.findById(taskId).exec();
      return existingTask;
    } catch(error) {
      console.log(`error in fetching the task with ID ${taskId}`, error);
    }
  }

  async updateTask(taskId: string, taskData: CreateTaskDto): Promise<Task> {
    
    try{
      const taskBody = {
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed,
        userId:taskData.userId
      }
     
      const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, taskBody, { new: true });
      
      
      return updatedTask;
    } catch(error) {
      console.log(`error in updating the task with ID ${taskId}`, error);
    }
  }
    

  async removeTask(taskId: string): Promise<void> {
    try{
      await this.taskModel.findByIdAndDelete(taskId);
      
    } catch(error) {
      console.log(`error in deleting the task with ID ${taskId}`, error);
    }
  }

}
