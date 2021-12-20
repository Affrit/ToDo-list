import React, { FC, useState } from 'react';
import { ToDoItem } from '../ToDoItem/TodoItem';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { ToDoSettings } from '../ToDoSettings/ToDoSettings';
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxSelector';
import { todoSlice } from '../../store/reducers/todoSlice';
import { ITask } from '../../models/ITask';
import { toDoSelector } from './toDoSelector';
import './style.css';

export const ToDoList: FC = (): JSX.Element => {
  const { setTasks } = todoSlice.actions
  const [value, setValue] = useState<string>('')
  const [isValueValid, setIsValueValid] = useState<boolean>(true)
  const [setingsToggle, setSetingsToggle] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { tasks, bGColor, textColor } = useAppSelector(toDoSelector)

  const taskStatusToggle = (id: number): void => {
    const newTasks: Array<ITask> = tasks.map((task: ITask): ITask => {
      if (task.id === id) {
        return {
          ...task,
          isTaskCompleted: !task.isTaskCompleted
        }
      } else {
        return { ...task }
      }
    })
    
    dispatch( setTasks(newTasks) )
  }

  const onDeleteItem = (id: number): void => {
    const newTasks = tasks.filter((task: ITask): boolean => task.id !== id)
    const newTasksWithUpdatedId: Array<ITask> = newTasks.map((task: ITask, idx: number): ITask => {
      return {
        ...task,
        id: idx + 1
      }
    })

    dispatch( setTasks(newTasksWithUpdatedId) )
  }

  const onAddItem = (): void => {
    if (!validation(value)) return

    const item: ITask = {
      id: tasks.length + 1,
      text: value,
      bGColor,
      textColor,
      isTaskCompleted: false
    }

    dispatch( setTasks([...tasks, item]) )
    setValue('')
  }

  const validation = (value: string): boolean => {
    const isNotUnique = tasks.some((task: ITask): boolean => task.text === value)

    if (value.length === 0 || isNotUnique) {
      setIsValueValid(false)
      return false
    } else {
      setIsValueValid(true)
      return true
    }
  }

  const onKeyPress = (e: React.KeyboardEvent): void => {
    if (e.code === 'Enter') {
      onAddItem()
    }
  }

  const onSettingsPushed = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setSetingsToggle(!setingsToggle)
  }

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(value)
  }

  const onSettingsSave = (): void => {
    setSetingsToggle(false)
  }

  const spawnTasks = (): Array<JSX.Element> => {
    return tasks.map((task: ITask, idx: number): JSX.Element => {
      return (
        <ToDoItem
          onDeleteItem={onDeleteItem} key={idx} id={task.id}
          text={task.text} backColor={task.bGColor}
          textColor={task.textColor} isTaskCompleted={task.isTaskCompleted}
          taskStatusToggle={taskStatusToggle}
        />
      )
    })
  }

  return (
    <div className='todo-wrap'>
      <span>Insert your task</span>
      <div className='todo-header'>
        <Input
          value={value}
          handleChange={handleChange}
          onKeyPress={onKeyPress}
          type='text'
          placeholder='type your task here'
          elemStyle={isValueValid ? 'todo' : 'todo-error'}
        />
        <Button onClick={onAddItem} elemStyle='todo' name='+' />
        <Button onClick={onSettingsPushed} elemStyle='todo' name='V' />
      </div>
      <div className='todo-body'>
        {tasks.length > 0 ? spawnTasks() :
          <div className='emty-message'>
            <span>You haven't any tasks yet!</span>
          </div>}
      </div>
      {setingsToggle && <ToDoSettings onSettingsSave={onSettingsSave} />}
    </div>
  )
}
