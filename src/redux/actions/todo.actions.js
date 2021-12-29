
export const actions = {
  SET_ALL_TODOS: "SET_ALL_TODOS",
  SET_CURRENT_TODO: "SET_CURRENT_TODO",
};

export const setAllTodos = data => ({
  type: actions.SET_ALL_TODOS,
  data
})

export const setCurrentTodo = data => ({
  type: actions.SET_CURRENT_TODO,
  data
})

