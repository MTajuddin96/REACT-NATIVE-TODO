import { setAllTodos } from "../redux/actions/todo.actions"
// import { openNotificationWithIcon } from "../utils/Notification"
import { request } from "./verb.services"

export const getAllTodos = () => {
  return dispatch => {
    return request('todos', 'get', null, true)
      .then(({ data }) => {
        dispatch(setAllTodos(data))
        return data
      })
      .catch((e) => {
        console.log(e)
        // openNotificationWithIcon('error', 'Error!', e.response.data.message);
      })
  }
}

export const addNewTodo = (data, prevSource) => {
  return dispatch => {
    return request('todos', 'post', data, true)
      .then(({ data }) => {
        dispatch(setAllTodos([...prevSource, { ...data }]))
      })
      .catch((e) => {
        console.log(e)
        // openNotificationWithIcon('error', 'Error!', e.response.data.message);
      })
  }
}

export const updateTodo = (id, data, prevSource) => {
  return dispatch => {
    return request(`todos/${id}`, 'put', data, true)
      .then(() => {
        let newSource = [...prevSource]
        newSource = newSource.map(o => {
          if (o.id === id) {
            return { ...data, id }
          }
          return o;
        })
        dispatch(setAllTodos(newSource))
      })
      .catch((e) => {
        console.log(e)
        // openNotificationWithIcon('error', 'Error!', e.response.data.message);
      })
  }
}

export const deleteTodo = (id, prevSource) => {
  return dispatch => {
    return request(`todos/${id}`, 'delete', null, true)
      .then(() => {
        let newSource = [...prevSource]
        newSource = newSource.filter(o => o.id !== id)
        dispatch(setAllTodos(newSource))
      })
      .catch((e) => {
        console.log(e)
        // openNotificationWithIcon('error', 'Error!', e.response.data.message);
      })
  }
}


