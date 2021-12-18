import './style.css';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import cn from 'classnames';

export const ToDoItem = (props) => {
  const { id, text, backColor, textColor, onDeleteItem, isTaskCompleted, taskStatusToggle } = props

  const handleChange = () => {
    taskStatusToggle(id)
  }

  const elemStyle = cn('item__body', {
    'item__body-complited': isTaskCompleted
  })

  return (
    <div style={{ backgroundColor: backColor, color: textColor }} className='item-wrap'>
      <Input type='checkbox' checked={isTaskCompleted} handleChange={handleChange} className='check' />
      <div className={elemStyle}>
        <span>{`${id}.`}</span>
        <p className='item__text'>{text}</p>
      </div>
      <div className='todo__close-btn'>
        <Button onClick={() => onDeleteItem(id)} elemStyle='close' />
      </div>
    </div>
  )
}
