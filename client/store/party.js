import axios from 'axios'
import history from '../history'

const GET_PARTY = 'GET PARTY'

const getParty = party => ({
  type: GET_PARTY,
  party
})

export const fetchParty = accessCode => async dispatch => {
  let res
  try {
    res = await axios.post(`api/parties/${accessCode}`, accessCode)
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

export default function partyReducer(state = {}, action) {
  switch (action.type) {
    case GET_PARTY:
      return action.party
    default:
      return state
  }
}
