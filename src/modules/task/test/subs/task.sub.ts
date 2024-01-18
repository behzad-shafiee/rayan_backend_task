import { CompletionStatusEnum } from '../../../../enum/completion-status.enum';

export const taskSub = () => {
  return {
    id: "1",
    title: 'auth',
    description: 'it is necessary',
    completion_status: CompletionStatusEnum.Completed,
  };
};

export const createTaskDto = () => {
  return {
    title: 'auth',
    description: 'it is necessary',
    completion_status: CompletionStatusEnum.Completed,
  };
};

export const updateTaskDto = () => {
  return {
    task_id: 1,
    title: 'auth',
    description: 'it is necessary',
    completion_status: CompletionStatusEnum.Completed,
  };
};
