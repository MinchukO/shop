import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'


//применяем тему тут а не в NavBar что бы странится login уже была в правильной теме
const themes = {
  dark: 'dracula',
  light: 'winter',
}
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.dark
  document.documentElement.setAttribute('data-theme', theme)
  return theme
}

const initialState = {
  user: { username: 'Olga' },
  theme: getThemeFromLocalStorage(),
  //permision можно было бы добавить
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log('login')
    },
    logoutUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
      toast.success('Logged out successfully')
    },
    toggleTheme: (state) => {
      const [light, dark] = [themes]
      state.theme = state.theme === dark ? light : dark
      document.documentElement.setAttribute('data-theme', state.theme)
      localStorage.setItem('theme', state.theme)
    },
  },
})

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions

export default userSlice.reducer
