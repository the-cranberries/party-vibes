import axios from 'axios'

const GET_PARTY = 'GET PARTY'

const getParty = party => ({
  type: GET_PARTY,
  party
})

export const fetchParty = accessCode => async dispatch => {
  try {
    const res = await axios.get(`/parties/${accessCode}`)
    dispatch(getParty(res.data))
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
