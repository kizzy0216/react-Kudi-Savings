import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import RootReducer from './root-reducer'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, RootReducer)
    
const store = createStore(persistedReducer)

export const persistor = persistStore(store)

export default store