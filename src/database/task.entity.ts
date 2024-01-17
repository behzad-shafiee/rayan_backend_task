import { CompletionStatusEnum } from 'src/enum/completion-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEnt } from './base.entity';

@Entity()
export class Task extends BaseEnt {

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: String, enum: CompletionStatusEnum })
  completion_status: CompletionStatusEnum;
}
