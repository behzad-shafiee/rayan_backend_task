import { ApiProperty } from '@nestjs/swagger';
import { CompletionStatusEnum } from '../../../enum/completion-status.enum';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ default: CompletionStatusEnum.Pending })
  completion_status: CompletionStatusEnum;
}
