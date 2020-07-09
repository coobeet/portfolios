import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import Router from "next/router"
import Cookies from "js-cookie"
import axios from "axios"

import { User, UserUpdateWithoutTodosDataInput } from "prisma"
import { env } from "utils"

export type UserState = User | {}

const initialState: UserState = {}

export const signedIn = (user: UserState): user is User => {
  return Object.keys(user).length !== 0
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (_state, action: PayloadAction<User>) => action.payload,
    deleteUser: () => ({}),
    updateUser: (
      state,
      action: PayloadAction<UserUpdateWithoutTodosDataInput>
    ) => ({ ...state, ...action.payload }),
  },
})

export const signin = createAsyncThunk(
  "user/signin",
  async (
    arg: {
      email: string
      password: string
    },
    { dispatch }
  ) => {
    const res = await axios.post(
      "/api/signin",
      { ...arg },
      {
        baseURL: env.BASE_URL,
      }
    )
    const { token, user } = res.data
    dispatch(createUser(user))
    Cookies.set("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    Router.push("/")
  }
)

export const signup = createAsyncThunk(
  "user/signup",
  async (
    arg: {
      username: string
      fullName: string
      email: string
      password: string
    },
    { dispatch }
  ) => {
    const res = await axios.post(
      "/api/signup",
      { ...arg },
      {
        baseURL: env.BASE_URL,
      }
    )
    const { token, user } = res.data
    dispatch(createUser(user))
    Cookies.set("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    Router.push("/")
  }
)

export const signout = createAsyncThunk(
  "user/signout",
  (_arg, { dispatch }) => {
    dispatch(deleteUser())
    Cookies.remove("token")
    localStorage.removeItem("user")
    localStorage.removeItem("todos")
  }
)

export const { createUser, deleteUser, updateUser } = userSlice.actions

export default userSlice.reducer
