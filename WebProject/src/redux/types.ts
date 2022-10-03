import { Store } from 'redux';
import { Saga } from 'redux-saga';

import { GlobalState } from './global/types';
import { LoginState } from '../scenes/Login/types';
import { ContactState } from '../scenes/Contact/types';
import { EmployeeState } from '../scenes/Employee/types';
import { DepartmentsState } from '../scenes/Departments/types';
import { KanbanState } from '../scenes/Kanban/type';
import { MypageState } from '../scenes/MyPage/types';

export interface InjectedStore extends Store {
    injectedReducers: any;
    injectedSagas: any;
    runSaga(saga: Saga<any[]> | undefined, args: any | undefined): any;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
    readonly global: GlobalState;
    readonly login: LoginState;
    readonly contact: ContactState;
    readonly employee: EmployeeState
    readonly departments: DepartmentsState;
    readonly kanban: KanbanState;
    readonly mypage: MypageState;
}
