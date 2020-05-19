import axios from 'axios'
import history from '../history'

const GET_PARTY = 'GET PARTY'
const END_PARTY = 'END PARTY'

const getParty = party => ({
  type: GET_PARTY,
  party
})

const endParty = partyId => ({
  type: END_PARTY,
  partyId
})

export const fetchParty = data => async dispatch => {
  // console.log('data', data)
  const {accessCode, name} = data
  let res
  try {
    res = await axios.post(`api/parties/${accessCode}`, {name})
    // dispatch(getParty(res.data))
    // console.log('access code info', res.data)
  } catch (errorCode) {
    return dispatch(getParty({error: errorCode}))
  }

  try {
    dispatch(getParty(res.data))
    history.push(`/parties/${accessCode}`)
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const deleteParty = userId => async dispatch => {
  try {
    const {data} = await axios.post(`api/users/${userId}/parties`)
    dispatch(endParty(data))
  } catch (err) {
    console.error(err)
  }
}

export default function partyReducer(state = {}, action) {
  switch (action.type) {
    case GET_PARTY:
      return action.party
    default:
      return state
  }
}
