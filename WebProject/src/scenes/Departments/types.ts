import { ActionType } from 'typesafe-actions';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import * as actions from './actions';
import { DepartmentsData } from './dtos/departmentsData';

export interface DepartmentsState {
    // Effect loading for table
    readonly loading: boolean;
    // flag reload
    readonly updateReload: boolean;
    readonly departmentData: PagedResultDto<DepartmentsData>;
    readonly downloadLoading: boolean;
    readonly uploadLoading: boolean;
    readonly uploadModalVisible: boolean;
    readonly departmentDetail: DepartmentsData;
    readonly updateLoading: boolean;
    readonly updateCompleted: boolean;
}

export type DepartmentsActions = ActionType<typeof actions>;
