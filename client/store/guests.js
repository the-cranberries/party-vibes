//action types
const ADD_GUEST = 'ADD_GUEST'

//action creators
export const addGuest = guest => ({
  type: ADD_GUEST,
  guest
})

//reducer

export default function(state = [], action) {
  switch (action.type) {
    case ADD_GUEST:
      return [...state, action.guest]
    default:
      return state
  }
}
