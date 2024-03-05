import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice, { initialState } from './slices/user.slice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'

const saveUserOnlyFilter = createFilter('user', ['user'])

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
  transforms: [saveUserOnlyFilter]
}

const rootReducer = combineReducers({
  user: userSlice
})

interface RootState {
  user: typeof initialState
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  },
  devTools: true
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof rootReducer>
