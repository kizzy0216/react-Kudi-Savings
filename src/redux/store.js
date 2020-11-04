import { createStore } from 'redux'
import RootReducer from './root-reducer'

const Store = createStore(RootReducer)

export default Store
