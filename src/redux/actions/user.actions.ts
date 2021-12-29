
export const actions = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

export const setUser = (data: any) => ({
  type: actions.SET_CURRENT_USER,
  data
})

