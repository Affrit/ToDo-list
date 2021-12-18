import React, { useState }  from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxSelector';
import { todoSlice } from '../../store/reducers/todoSlice';
import './style.css';

export const ToDoSettings = ({ onSettingsSave }) => {
  const { setBGColor, setTextColor, setSavedSettings } = todoSlice.actions
  const { savedSettings } = useAppSelector(({ todo: { savedSettings } }) => ({
    savedSettings
  }))
  const [settings, setSettings] = useState({
    ...savedSettings
  })
  const dispatch = useAppDispatch()
  const textColor = `rgba(${settings.textColorR}, ${settings.textColorG}, 
    ${settings.textColorB}, ${settings.textColorO})`
  const bGColor = `rgba(${settings.bGColorR}, ${settings.bGColorG}, 
    ${settings.bGColorB}, ${settings.bGColorO})`

  const handleChange = ({ target }) => {
    setSettings({
      ...settings,
      [target.id]: target.value
    })
  }

  const onSaveSettings = () => {
    dispatch(setSavedSettings({
      ...settings
    }))
    dispatch(setTextColor(textColor))
    dispatch(setBGColor(bGColor))
    onSettingsSave()
  }

  return (
    <div className='todo-settings'>
      <div className='todo-settings__inner'>
        <div className='todo-settings__item'>
          <span className='todo-settings__title'>Text color:</span>
          <Input
            elemStyle='todo-settings' type='range'
            value={settings.textColorR} handleChange={handleChange}
            id='textColorR' name='R' min='0' max='255' step='1'
          />
          <Input
            elemStyle='todo-settings' type='range'
            value={settings.textColorG} handleChange={handleChange}
            id='textColorG' name='G' min='0' max='255' step='1'
          />
          <Input
            elemStyle='todo-settings' type='range'
            value={settings.textColorB} handleChange={handleChange}
            id='textColorB' name='B' min='0' max='255' step='1'
          />
          <Input
            elemStyle='todo-settings' type='range'
            value={settings.textColorO} handleChange={handleChange}
            id='textColorO' name='O' min='0' max='1' step='0.1'
          />
          <span>{textColor}</span>
        </div>

        <div className='todo-settings__item'>
          <span className='todo-settings__title'>BG color:</span>
          <Input
            elemStyle='todo-settings' type='range'
            value={settings.bGColorR} handleChange={handleChange}
            id='bGColorR' name='R' min='0' max='255' step='1'
          />
          <Input
            elemStyle='todo-settings' type='range'
            value={settings.bGColorG} handleChange={handleChange}
            id='bGColorG' name='G' min='0' max='255' step='1'
          />
          <Input
            elemStyle='todo-settings' type='range'
            value={settings.bGColorB} handleChange={handleChange}
            id='bGColorB' name='B' min='0' max='255' step='1'
          />
          <Input
            elemStyle='todo-settings' type='range'
            value={settings.bGColorO} handleChange={handleChange}
            id='bGColorO' name='O' min='0' max='1' step='0.1'
          />
          <span>{bGColor}</span>
        </div>
      </div>
      <div className='example-wrap' >
        <div className='example' style={{ backgroundColor: bGColor, color: textColor }}>
          <span>Example Text</span>
        </div>
        <Button name='Save settings' onClick={onSaveSettings} elemStyle='formSmall' />
      </div>
    </div>
  )
}
