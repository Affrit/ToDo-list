import { ITodoSettings } from './../../models/ITodoSettings';
import { ITask } from './../../models/ITask';

interface IToDOSelector {
  todo: {
    tasks: Array<ITask>,
    settings: ITodoSettings
  }
}

export const toDoSelector = ({
  todo: {
    tasks,
    settings: {
      bGColor,
      textColor
    }
  } }: IToDOSelector) => ({
    tasks, bGColor, textColor
  })