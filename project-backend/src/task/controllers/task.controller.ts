import { Controller, Post, Get, Param, Body, UseGuards, Delete, Put, Request, Logger } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from '../dto/create-task.dto';
import { log } from 'console';
import { TaskOwnerGuard } from '../guards/TaskOwnerGuard';

@Controller('tasks')
@UseGuards(AuthGuard('jwt')) // Protecting all routes in this controller with JWT strategy
export class TaskController {

  constructor(private readonly taskService: TaskService) {}
  
  @Post()
  createTask(@Request() req , @Body() createTaskDto: CreateTaskDto) {
    const loggedInUserId = req.user._id;
    createTaskDto.userId = loggedInUserId;
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  findAllTasks(@Request() req) {
    const loggedInUserId = req.user._id;
    const tasks =  this.taskService.findAllTasks(loggedInUserId);
    return tasks;
  }


  @Get(':taskId')
  @UseGuards(TaskOwnerGuard)
  findOneTask(@Param('taskId') taskId: string, @Request() req ) {
    //const loggedInUserId = req.user._id;
    return this.taskService.findOneTask(taskId);
  }

  @Put(':taskId')
  @UseGuards(TaskOwnerGuard)
  async updateTask(@Param('taskId') taskId: string, @Body() createTaskDto: CreateTaskDto, @Request() req ) {
    const loggedInUserId = req.user._id;
    const updatedTask = await this.taskService.updateTask(taskId, createTaskDto);
    return updatedTask;
  }

  @Delete(':taskId')
  @UseGuards(TaskOwnerGuard)
  removeTask(@Param('taskId') taskId: string, @Request() req) {
    const loggedInUserId = req.user.id;
    return this.taskService.removeTask(taskId);
  }
  
}
