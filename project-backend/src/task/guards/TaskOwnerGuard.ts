import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schema/task.schema';

import { Model } from 'mongoose';


@Injectable()
export class TaskOwnerGuard implements CanActivate {
    
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        
        const request = context.switchToHttp().getRequest();
        const taskId = request.params.taskId;
        const loggedInUserId = request.user._id;
        const task = await this.taskModel.findById(taskId).exec();

        if(task.userId.toString() !== loggedInUserId.toString()) { //again doesnt work without .toString()
            throw new ForbiddenException({
                statusCode: 403,
                message: 'Access Denied',
              });
        }
        
        return true;
    }
    
}