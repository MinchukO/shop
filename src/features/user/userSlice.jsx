import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

//применяем тему тут а не в NavBar что бы странится login уже была в правильной теме
const themes = {
  dark: 'dracula',
  light: 'winter',
}
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null
}
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.dark
  document.documentElement.setAttribute('data-theme', theme)
  return theme
}

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
  //permision можно было бы добавить
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      //action.payload // {jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjk3M…zMjl9.H6zSyS24XGJ_rvS2Qd_AZhBdosYkrvKhLfD_ref2ffA', user: {…}}

      const user = { ...action.payload.user, token: action.payload.jwt }
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
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
