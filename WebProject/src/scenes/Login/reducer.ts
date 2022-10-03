import ActionTypes from './constants';
import { LoginState, LoginActions } from './types';

declare const abp: any;
export const initialState: LoginState = {
    loading: false,
    completed: false,
};
const loginReducer = (
    state: LoginState = initialState,
    action: LoginActions,
) => {
    switch (action.type) {
        case ActionTypes.REQUEST_LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.REQUEST_LOGIN_SUCCESS:
            abp.auth.setToken(action.payload.accessToken, undefined);
            abp.auth.setRoles(action.payload.roleList, undefined);
            return {
                ...state,
                loading: false,
                completed: true,
            };
        case ActionTypes.REQUEST_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default loginReducer;
