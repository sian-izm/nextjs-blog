import getConfig from "next/config";
import { BehaviorSubject } from 'rxjs';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username, password) {
  return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
    .then(user => {
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));

      return user      ;
    });
}
