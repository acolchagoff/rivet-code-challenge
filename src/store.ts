import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './features/profile/profileSlice'

export const rootReducer = {
  profile: profileReducer
}

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
