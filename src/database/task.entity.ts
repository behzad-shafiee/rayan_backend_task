import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { CompletionStatusEnum } from 'src/enum/completion-status.enum';
import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  Entity,
} from 'typeorm';
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
