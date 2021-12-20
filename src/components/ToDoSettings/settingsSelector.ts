import { ITodoSavedSettings } from "../../models/ITodoSettings"

interface ISettingsSelector {
  todo: {
    savedSettings: ITodoSavedSettings
  }
}

export const settingsSelector = ({ 
  todo: { 
    savedSettings
  } 
}: ISettingsSelector) => ({
  savedSettings
})
