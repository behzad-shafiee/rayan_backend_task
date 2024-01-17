import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/guard/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('one')
  @ApiQuery({ name: 'task_id', type: String })
  findOne(@Query('task_id') task_id: string) {
    return this.taskService.findOne(+task_id);
  }

  @Put()
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto);
  }

  @Delete()
  @ApiQuery({ name: 'task_id', type: String })
  remove(@Query('task_id') task_id: string) {
    return this.taskService.remove(+task_id);
  }
}
