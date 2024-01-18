import { taskSub } from '../subs/task.sub'

export const mcokTaskService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(taskSub()),
  findAll: jest.fn().mockResolvedValue([taskSub()]),
  findOne: jest.fn().mockResolvedValue(taskSub()),
  update: jest.fn().mockResolvedValue(taskSub()),
  remove: jest.fn().mockResolvedValue(taskSub()),
});
