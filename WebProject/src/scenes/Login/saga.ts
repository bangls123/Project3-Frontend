import {
    call,
    put,
    takeLatest,
    race,
} from 'redux-saga/effects';

import { requestLoginCompleted, requestLoginError } from './actions';
import ActionTypes from './constants';
import loginService from './services';

function* requestLogin(input: any) {
    try {
        const { output } = yield race({
            output: call(loginService.authenticate, input.payload),
        });
        if (output) {
            yield put(requestLoginCompleted(output));
        } else {
            yield put(requestLoginError());
        }
    } catch (error) {
        yield put(requestLoginError());
    }
}

export default function* watchLoginScreenAction() {
    yield takeLatest(
        ActionTypes.REQUEST_LOGIN_START,
        requestLogin,
    );
}
