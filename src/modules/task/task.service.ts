import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../database/task.entity';
import { DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private dataSource: DataSource,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = new Task();
      task.title = createTaskDto.title;
      task.description = createTaskDto.description;
      task.completion_status = createTaskDto.completion_status;
      await this.dataSource.manager.save(task);

      await this.cacheManager.reset();

      return {
        message: 'task created',
        task,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const tasks = await this.dataSource.manager.find(Task, {});
      if (!tasks) throw new BadRequestException('tasks deos not found');
      await this.cacheManager.set(`all_tasks`, tasks);
      return {
        message: 'all tasks :',
        tasks,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(task_id: string) {
    try {
      const task = await this.dataSource.manager.findOne(Task, {
        where: { id: +task_id },
      });
      if (!task)
        throw new BadRequestException('task with this id does not exist');
      await this.cacheManager.set(`task_${task_id}`, task);
      return {
        message: 'find task according to id:',
        task,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.dataSource.manager.findOne(Task, {
        where: { id: updateTaskDto.task_id },
      });
      if (!task)
        throw new BadRequestException('task with this id does not exist');
      task.title = updateTaskDto.title;
      task.description = updateTaskDto.description;
      task.completion_status = updateTaskDto.completion_status;
      await this.dataSource.manager.save(task);

      await this.cacheManager.reset();

      return {
        message: 'task updated',
        task,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.dataSource.manager.softDelete(Task, +id);

      await this.cacheManager.reset();

      return {
        message: 'task deleted',
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.getStatus?.()
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
