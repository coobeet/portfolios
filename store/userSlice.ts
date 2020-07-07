import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import Router from "next/router"
import Cookies from "js-cookie"
import axios from "axios"

import { User, UserUpdateWithoutTodosDataInput } from "prisma"

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
        baseURL: "http://localhost:3000",
      }
    )
    const { token, user } = res.data
    dispatch(createUser(user))
    Cookies.set("token", token)
    Router.push("/")
  }
)

export const signout = createAsyncThunk(
  "user/signout",
  (_arg, { dispatch }) => {
    dispatch(deleteUser())
    Cookies.remove("token")
  }
)

export const { createUser, deleteUser, updateUser } = userSlice.actions

export default userSlice.reducer
