import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { Task } from '../../../database/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mcokTaskDataSource } from './__mocks__/task.mock-datasource';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getRepositoryToken(Task), useValue: mcokTaskDataSource },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});
