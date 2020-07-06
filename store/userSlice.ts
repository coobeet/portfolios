import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import Router from "next/router"
import Cookies from "js-cookie"
import axios from "axios"

import { User } from "prisma"

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    resetUser: () => ({}),
    updateUser: (_state, action: PayloadAction<User>) => action.payload,
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
    dispatch(updateUser(user))
    Cookies.set("token", token)
    Router.push("/")
  }
)

export const signout = createAsyncThunk(
  "user/signout",
  (_arg, { dispatch }) => {
    dispatch(resetUser())
    Cookies.remove("token")
  }
)

export const { resetUser, updateUser } = userSlice.actions

export default userSlice.reducer
