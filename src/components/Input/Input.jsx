import React from 'react';
import './style.css';
import cn from 'classnames';

export const Input = (props) => {
  const { elemStyle, name, id, handleChange, ...rest } = props
  const wrapStyle = cn(
    { 'form__item': elemStyle === 'form' },
    { 'form__item': elemStyle === 'formError' },
    { 'todo__input-wrap': elemStyle === 'todo' },
    { 'todo__input-wrap': elemStyle === 'todo-error' },
    { 'todo-settings__input-wrap': elemStyle === 'todo-settings' }
  )
  const inputStyle = cn(
    { 'form__input': elemStyle === 'form' },
    { 'form__input red-border': elemStyle === 'formError' },
    { 'todo__input': elemStyle === 'todo' },
    { 'todo-settings__input': elemStyle === 'todo-settings' },
    { 'todo__input-red': elemStyle === 'todo-error' },
  )
  const labelStyle = cn(
    { 'form__label': elemStyle === 'form' },
    { 'form__label': elemStyle === 'formError' },
  )

  return (
    <div className={wrapStyle}>
      <label className={labelStyle} htmlFor={id}>
        {name}
      </label>
      <input
        className={inputStyle} id={id}
        onChange={handleChange} {...rest}
      />
    </div>
  )
}
