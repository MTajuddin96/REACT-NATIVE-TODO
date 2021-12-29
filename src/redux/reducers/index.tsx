import { combineReducers } from "redux";
import todo from './todo.reducer';
import user from './user.reducer';


// Root Reducer.
const reducer = () => combineReducers({
  todo,
  user
});


export default reducer