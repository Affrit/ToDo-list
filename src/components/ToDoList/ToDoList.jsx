import React, { useState } from 'react';
import './style.css';
import { ToDoItem } from '../ToDoItem/TodoItem';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { ToDoSettings } from '../ToDoSettings/ToDoSettings';
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxSelector';
import { todoSlice } from '../../store/reducers/todoSlice';

export const ToDoList = () => {
  const { setTasks } = todoSlice.actions
  const [value, setValue] = useState('')
  const [isValueValid, setIsValueValid] = useState(true)
  const [setingsToggle, setSetingsToggle] = useState(false)
  const dispatch = useAppDispatch()
  const { tasks } = useAppSelector(({ todo: { tasks } }) => ({
    tasks
  }))
  const { bGColor, textColor } = useAppSelector(({ todo: { settings: { bGColor, textColor } } }) => ({
    bGColor, textColor
  }))

  const taskStatusToggle = (id) => {
    const newTasks = tasks.map(task => {
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

  const onDeleteItem = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    const newTasksWithUpdatedId = newTasks.map((task, idx) => {
      return {
        ...task,
        id: idx + 1
      }
    })

    dispatch( setTasks(newTasksWithUpdatedId) )
  }

  const onAddItem = () => {
    if (!validation(value)) return

    const item = {
      id: tasks.length + 1,
      text: value,
      bGColor,
      textColor,
      isTaskCompleted: false
    }

    dispatch( setTasks([...tasks, item]) )
    setValue('')
  }

  const validation = (value) => {
    const isNotUnique = tasks.some(task => task.text === value)

    if (value.length === 0 || isNotUnique) {
      setIsValueValid(false)
      return false
    } else {
      setIsValueValid(true)
      return true
    }
  }

  const onKeyPress = (e) => {
    if (e.code === 'Enter') {
      onAddItem()
    }
  }

  const onSettingsPushed = () => {
    setSetingsToggle(!setingsToggle)
  }

  const onSettingsSave = () => {
    setSetingsToggle(false)
  }

  const handleChange = ({ target: { value } }) => {
    setValue(value)
  }

  const spawnTasks = () => {
    return tasks.map((task, idx) => {
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
