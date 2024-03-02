import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { environment } from '../utils/variables'
import userSlice, {
  initialState as userInitialState
} from '../features/user_slice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'

const saveUserOnlyFilter = createFilter('user', ['user.user'])

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
  user: typeof userInitialState
}

const persistedReduce = persistReducer<RootState>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: environment === 'dev'
})

export const persister = persistStore(store)
