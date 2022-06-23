import { ActionType, Session, SessionAction } from './session.model'

const initialState: Session = {
  hasSession: false,
  isAuthorized: false,
  isAuthenticated: false,
  user: null,
}

// eslint-disable-next-line @typescript-eslint/default-param-last
const session = (state = initialState, action: SessionAction): Session => {
  switch (action.type) {
    case ActionType.LOGGED_OUT:
      return {
        ...initialState,
        hasSession: true,
      }

    case ActionType.LOGGED_IN: {
      console.log(action, state)
      return {
        ...state,
        hasSession: true,
        ...action.data,
        user: action.data.user,
      }
    }

    default:
      return state
  }
}

export { session }
