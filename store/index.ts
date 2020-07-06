import { combineReducers, configureStore } from "@reduxjs/toolkit"

import userReducer from "./userSlice"

const rootReducer = combineReducers({
  user: userReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default store
