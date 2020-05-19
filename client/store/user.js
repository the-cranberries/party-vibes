import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const MAKE_USER_PARTY = 'MAKE_USER_PARTY'
const GET_USER_PARTY = 'GET_USER_PARTY'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const makeUserParty = party => ({type: MAKE_USER_PARTY, party})
const getUserParty = party => ({type: GET_USER_PARTY, party})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const postUserParty = userId => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${userId}/parties`)
    dispatch(makeUserParty(res.data))
  } catch (err) {
    console.error(err.message)
  }
}

export const fetchUserParty = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/parties`)
    dispatch(getUserParty(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  name,
  profilePicture
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      name,
      profilePicture
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USER_PARTY:
      return {...state, userParty: action.party}
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
