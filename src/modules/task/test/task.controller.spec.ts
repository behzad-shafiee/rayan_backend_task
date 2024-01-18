import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import { mcokTaskService } from './__mocks__/task.service';
import { createTaskDto, taskSub, updateTaskDto } from './subs/task.sub';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    })
      .overrideProvider(TaskService)
      .useValue(mcokTaskService())
      .compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  describe('create', () => {
    let task;
    beforeEach(async () => {
      task = await taskController.create(createTaskDto());
    });
    it('create method in taskService must called ', async () => {
      expect(await taskService.create).toHaveBeenCalled();
    });
    it('output must be taskSub ', async () => {
      expect(task).toEqual(taskSub());
    });
  });

  describe('findAll', () => {
    let tasks;
    beforeEach(async () => {
      tasks = await taskController.findAll();
    });
    it('finAll method in taskService must called ', async () => {
      expect(taskService.findAll).toHaveBeenCalled();
    });
    it('output must be array of taskSub ', async () => {
      expect(tasks).toEqual([taskSub()]);
    });

    describe('findOne', () => {
      let task;
      beforeEach(async () => {
        task = await taskController.findOne(taskSub().id);
      });
      it('finOne method in taskService must called', async () => {        
        expect(taskService.findOne).toHaveBeenCalledWith(taskSub().id);
      });
      it('output must be taskSub ', async () => {
        expect(task).toEqual(taskSub());
      });
    });

    describe('update', () => {
        let task;
        beforeEach(async () => {
            task = await taskController.update(updateTaskDto())
        })
        it('updated method in taskService must called ', async () => {
            expect(taskService.update).toHaveBeenCalledWith(updateTaskDto())
        });
        it('output must be taskSub ', async () => {
            expect(task).toEqual(taskSub())
        });
    })

    describe('remove', () => {
        let task;
        beforeEach(async () => {
            task = await taskController.remove(taskSub().id)
        })
        it('remove method in taskService must called ', async () => {
            expect( taskService.remove).toHaveBeenCalledWith(taskSub().id)
        });
        it('output must be taskSub ', async () => {
            expect(task).toEqual(taskSub())
        });
    })

  });
});
