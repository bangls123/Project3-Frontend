import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface LoginState {
    readonly loading: boolean;
    readonly completed: boolean;
}

export type LoginActions = ActionType<typeof actions>;
