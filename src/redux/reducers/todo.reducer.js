import { actions } from '../actions/todo.actions';

const INITIAL_STATE = {
  allTodos: [],
  currentTodo: null

}

const reducer = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
    case actions.SET_ALL_TODOS:
      return { ...state, allTodos: data }
    case actions.SET_CURRENT_TODO:
      return { ...state, currentTodo: data }
    default:
      return state
  }
}

export default reducer