import { CompletionStatusEnum } from 'src/enum/completion-status.enum';
import { Column, Entity } from 'typeorm';
import { BaseEnt } from './base.entity';

@Entity()
export class Task extends BaseEnt {
  @Column({ nullable: false, type: String })
  title: string;

  @Column({ nullable: true, type: String })
  description: string;

  @Column({ type: String, enum: CompletionStatusEnum })
  completion_status: CompletionStatusEnum;
}
