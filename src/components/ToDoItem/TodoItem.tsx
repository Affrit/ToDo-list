import React, { FC } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './style.css';
import cn from 'classnames';

export interface IProps {
  id: number,
  text: string,
  backColor: string,
  textColor: string,
  isTaskCompleted: boolean,
  onDeleteItem: (id: number) => void,
  taskStatusToggle: (id: number) => void,
}

export const ToDoItem: FC<IProps> = (props): JSX.Element => {
  const { id, text, backColor, 
          textColor, isTaskCompleted, 
          taskStatusToggle, onDeleteItem } = props

  const onCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    taskStatusToggle(id)
  }

  const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    onDeleteItem(id)
  }

  const elemStyle: string = cn('item__body', {
    'item__body-complited': isTaskCompleted
  })

  return (
    <div style={{ backgroundColor: backColor, color: textColor }} className='item-wrap'>
      <Input type='checkbox' checked={isTaskCompleted} handleChange={onCheckBoxChange} className='check' />
      <div className={elemStyle}>
        <span>{`${id}.`}</span>
        <p className='item__text'>{text}</p>
      </div>
      <div className='todo__close-btn'>
        <Button onClick={onDeleteHandler} elemStyle='close' />
      </div>
    </div>
  )
}
