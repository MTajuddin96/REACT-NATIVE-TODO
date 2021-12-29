import { actions } from '../actions/user.actions';

const INITIAL_STATE = {
  currentUser: null
}

const reducer = (state = INITIAL_STATE, data: { type: string, data: any | null }) => {
  switch (data.type) {
    case actions.SET_CURRENT_USER:
      return { ...state, currentUser: data.data }

    default:
      return state
  }
}

export default reducer