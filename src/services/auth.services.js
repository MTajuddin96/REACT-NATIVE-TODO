import { setUser } from "../redux/actions/user.actions"
import { getItem, setItem } from "../utils/storage"
import { request } from "./verb.services"

export const loginUser = (data, callback) => {
  return dispatch => {
    return request('auth/login', 'post', data, false)
      .then(({ data }) => {
        console.log(data)
        dispatch(setUser(data.user))
        setItem('user', data.user)
        setItem('tokenContainer', { token: data.access_token })
        callback()
      })
      .catch((e) => {
        console.log(e)
        return new Error(e)
      })
  }
}