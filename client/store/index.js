import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user, {putUser} from './user'
import party from './party'

const reducer = combineReducers({user, party})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

store.dispatch(putUser(1, {profilePicture: 'reduxTest.jpg'}))

export default store
export * from './user'
export * from './party'
