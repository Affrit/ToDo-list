import React from 'react';
import './style.css';
import cn from 'classnames';

export const Button = (props) => {
  const { elemStyle, name, ...rest } = props
  const btnStyle = cn(
    { 'form__btn': elemStyle === 'form' },
    { 'close-btn': elemStyle === 'close' },
    { 'redirect-btn': elemStyle === 'formSmall' },
    { 'todo-btn': elemStyle === 'todo' }
  )
  const wrapStyle = cn(
    { 'form__item': elemStyle === 'form' },
    { 'close-btn-wrap': elemStyle === 'close' },
    { 'redirect-btn-wrap': elemStyle === 'formSmall' },
    { 'todo-btn-wrap': elemStyle === 'todo' }
  )

  return (
    <div className={wrapStyle}>
      <button className={btnStyle} {...rest}>
        {name}
      </button>
    </div>
  )
}
