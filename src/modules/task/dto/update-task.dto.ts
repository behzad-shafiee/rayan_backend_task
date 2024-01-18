import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTaskDto extends CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  task_id: number;
}
