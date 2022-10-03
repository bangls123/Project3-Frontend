import { ActionType } from 'typesafe-actions';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import * as actions from './actions';
import { DepartmentResult } from './dtos/departmentResult';
import { DetailEmployee } from './dtos/detailEmployee';
import { EmployeeResult } from './dtos/employeeResult';

export interface EmployeeState{
    // Effect loading for table
    readonly loading: boolean,
    readonly keyword: string,
    // Effect loading for download
    readonly downloadLoading: boolean;
    readonly datas: PagedResultDto<EmployeeResult>
    readonly reloadF: boolean;
    // Effect loading for upload
    readonly uploadLoading: boolean;
    readonly uploadModalOpen: boolean;
    readonly employeeDetail: DetailEmployee
    readonly detailLoading: boolean
    readonly saveLoading: boolean
    readonly updateCompleted: boolean
    readonly currentPage: number,
    readonly maxResultCount: number
    readonly departmentDatas: PagedResultDto<DepartmentResult>
    readonly loadingDepartment: boolean
}

export type EmployActions = ActionType<typeof actions>;
