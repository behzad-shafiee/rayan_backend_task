import { ApiProperty } from '@nestjs/swagger';
import { CompletionStatusEnum } from '../../../enum/completion-status.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ default: CompletionStatusEnum.Pending })
  @IsNotEmpty()
  @IsEnum(CompletionStatusEnum)
  completion_status: CompletionStatusEnum;
}
