import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import RootReducer from './root-reducer'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const intialState = {};

const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, RootReducer)
    
const store = createStore(persistedReducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export const persistor = persistStore(store)

export default store