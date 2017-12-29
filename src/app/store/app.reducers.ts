import * as UserActions from './app.action';
import { LoginData, Token } from '../servers/model/login';


export type Action = UserActions.All;

const tokenState: Token = {
  token: '',
  message: '',
  status: ''
};

const userState: LoginData = {
  name: '',
  username: '',
  token: '',
  role: 2
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function userReducer(state: LoginData = userState, action: Action) {
  console.log(state);
  switch (action.type) {
    case UserActions.USERS:
      return newState(state,  {users : action.payload});
  }

}
