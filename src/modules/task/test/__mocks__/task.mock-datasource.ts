import { taskSub } from '../subs/task.sub';

export const mcokTaskDataSource = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue((dto) => dto),
  findAll: jest.fn().mockResolvedValue([taskSub()]),
  findOne: jest.fn().mockResolvedValue(taskSub()),
  update: jest.fn().mockResolvedValue(taskSub()),
  remove: jest.fn().mockResolvedValue(taskSub()),
  save: jest.fn().mockResolvedValue((task) => {
    return { id: Date.now(), ...task };
  }),
});
