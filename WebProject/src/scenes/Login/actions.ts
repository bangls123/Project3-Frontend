import { action } from 'typesafe-actions';
import { AuthenticationInput } from './dtos/authenticationInput';
import { AuthenticationResult } from './dtos/authenticationResult';

import ActionTypes from './constants';

export const requestLoginStart = (input: AuthenticationInput) => (
    action(ActionTypes.REQUEST_LOGIN_START, input)
);

export const requestLoginCompleted = (output: AuthenticationResult) => (
    action(ActionTypes.REQUEST_LOGIN_SUCCESS, output)
);

export const requestLoginError = () => (
    action(ActionTypes.REQUEST_LOGIN_ERROR)
);
