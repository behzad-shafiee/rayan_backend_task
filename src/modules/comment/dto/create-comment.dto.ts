import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  post_id: number;

  @ApiProperty()
  user_id: number;
}
