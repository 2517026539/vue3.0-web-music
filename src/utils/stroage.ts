import { ThemeType } from '@/store/modules/theme'
export const _setThemeType = (type: string) => {
  sessionStorage.setItem('themeType', JSON.stringify(type))
}

export const _getThemeType = (type: string): ThemeType => {
  return JSON.parse(sessionStorage.getItem('themeType')) || 'red'
}
