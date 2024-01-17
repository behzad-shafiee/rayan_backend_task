import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/database/task.entity';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private dataSource: DataSource,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.completion_status = createTaskDto.completion_status;
    await this.dataSource.manager.save(task);
    return {
      message: 'task created',
      task,
    };
  }

  async findAll() {
    const tasks = await this.dataSource.manager.find(Task, {});
    return {
      message: 'all tasks :',
      tasks,
    };
  }

  async findOne(task_id: number) {
    const task = await this.dataSource.manager.findOne(Task, {
      where: { id: task_id },
    });
    return {
      message: 'find task according to id:',
      task,
    };
  }

  async update(updateTaskDto: UpdateTaskDto) {
    const task = await this.dataSource.manager.findOne(Task, {
      where: { id: updateTaskDto.task_id },
    });
    if (!task)
      throw new BadRequestException('task with this id does not exist');
    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.completion_status = updateTaskDto.completion_status;
    await this.dataSource.manager.save(task);
    return {
      message: 'task updated',
      task,
    };
  }

  async remove(id: number) {
    await this.dataSource.manager.softDelete(Task, id);
    return {
      message: 'task deleted',
    };
  }
}
