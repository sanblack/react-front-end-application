import { Dispatch } from 'redux';

import { ActionType, LocalStorage, Session } from './session.model';

const staticUserInfo: Session['user'] = {_id: '123', name: 'Sanjeev', email: 'sanjeev@gmail.com'}

const initSession = () => (dispatch: Dispatch): void => {
  const isLoggedIn = localStorage.getItem(LocalStorage.IS_LOGGED_IN)
  
  if (!isLoggedIn) {
    logout()(dispatch)
    return
  }
  onLoggedIn(staticUserInfo)(dispatch)
}

const logout = () => (dispatch: Dispatch) => {
  localStorage.clear()
  dispatch({
    type: ActionType.LOGGED_OUT,
  })
}

 export const login = () => (dispatch: Dispatch): void => {
  localStorage.setItem(LocalStorage.IS_LOGGED_IN, 'true')
  onLoggedIn(staticUserInfo)(dispatch)
}

const onLoggedIn = (userInfo: Session['user']) => (dispatch: Dispatch): void => {
  dispatch({
    type: ActionType.LOGGED_IN,
    data: { user: userInfo, isAuthorized: true, isAuthenticated: true },
  })
}


export { initSession, onLoggedIn, logout }
