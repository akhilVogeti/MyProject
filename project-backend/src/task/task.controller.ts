import { Controller, Post, Get, Param, Body, UseGuards, Delete, Put, Request, Logger } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { log } from 'console';

@Controller('tasks')
@UseGuards(AuthGuard('jwt')) // Protecting all routes in this controller with JWT strategy
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @Post()
  createTask(@Request() req , @Body() createTaskDto: CreateTaskDto) {
    const loggedInUserId = req.user._id;
    createTaskDto.userId = loggedInUserId
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  findAllTasks(@Request() req) {
    const loggedInUserId = req.user._id;
    return this.taskService.findAllTasks(loggedInUserId);
  }

  @Get(':taskId')
  findOneTask(@Param('taskId') taskId: string, @Request() req ) {
    const loggedInUserId = req.user._id;
    return this.taskService.findOneTask(taskId, loggedInUserId);
  }

  @Put(':taskId')
  async updateTask(@Param('taskId') taskId: string, @Body() createTaskDto: CreateTaskDto, @Request() req ) {
    const loggedInUserId = req.user.id;
    const updatedTask = await this.taskService.updateTask(taskId, createTaskDto, loggedInUserId);
    return updatedTask;
  }

  @Delete(':taskId')
  removeTask(@Param('taskId') taskId: string, @Request() req) {
    const loggedInUserId = req.user.id;
    return this.taskService.removeTask(taskId,loggedInUserId);
  }
}
