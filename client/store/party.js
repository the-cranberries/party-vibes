import axios from 'axios'

const GET_PARTY = 'GET PARTY'

const getParty = party => ({
  type: GET_PARTY,
  party
})

export const fetchParty = accessCode => async dispatch => {
  try {
    const res = await axios.post(`api/parties/${accessCode}`)
    dispatch(getParty(res.data))
    // console.log('access code info', res.data)
  } catch (err) {
    return dispatch(getParty({error: err}))
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
