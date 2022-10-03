import { UploadFile } from 'antd/lib/upload/interface';
import { action } from 'typesafe-actions';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { ReportResultDto } from '../../services/dto/reportResultDto';
import ActionTypes from './constants';
import { CreateEmployee } from './dtos/createEmployee';
import { DepartmentResult } from './dtos/departmentResult';
import { DetailEmployee } from './dtos/detailEmployee';
import { EmployeeFilterDto } from './dtos/employeeFilterDto';
import { EmployeeResult } from './dtos/employeeResult';
import { UpdateEmployee } from './dtos/updateEmployee';

export const changeOptionSearch = (input: EmployeeFilterDto) => action(ActionTypes.CHANGE_OPTION_FILTER, input);

export const getEmployeesStart = (input: EmployeeFilterDto) => action(ActionTypes.GET_EMPLOYEE_START, input);

export const getEmployeesSuccess = (output: PagedResultDto<EmployeeResult>) => action(ActionTypes.GET_EMPLOYEE_SUCCESS, output);

export const getEmployeesError = () => action(ActionTypes.GET_EMPLOYEE_ERROR);

export const getDetailEmployeesStart = (input: string) => action(ActionTypes.GET_DETAIL_EMPLOYEE_START, input);

export const getDetailEmployeesSuccess = (output: DetailEmployee) => action(ActionTypes.GET_DETAIL_EMPLOYEE_SUCCESS, output);

export const getDetailEmployeesError = () => action(ActionTypes.GET_DETAIL_EMPLOYEE_ERROR);

export const downloadEmploy = () => action(ActionTypes.DOWNLOAD_EMPLOYEE_START);

export const downloadEmploySuccess = (output: ReportResultDto) => action(ActionTypes.DOWNLOAD_EMPLOYEE_SUCCESS, output);

export const downloadEmployError = () => action(ActionTypes.DOWNLOAD_EMPLOYEE_ERROR);

export const deleteEmployeeStart = (id: number) => action(ActionTypes.DELETE_EMPLOYEE_START, id);

export const deleteEmployeeSuccess = () => action(ActionTypes.DELETE_EMPLOYEE_SUCCESS);

export const deleteEmployeeError = () => action(ActionTypes.DELETE_EMPLOYEE_ERROR);

export const toggleUploadModal = () => action(ActionTypes.TOGGLE_UPLOAD_MODAL);

export const uploadEmployeeStart = (input: UploadFile[]) => action(ActionTypes.UPLOAD_EMPLOYEE_START, input);

export const uploadEmployeeSuccess = (input: ReportResultDto) => action(ActionTypes.UPLOAD_EMPLOYEE_SUCCESS, input);

export const uploadEmployeeError = () => action(ActionTypes.UPLOAD_EMPLOYEE_ERROR);

export const getDepartmentStart = (input: any) => action(ActionTypes.GET_SELECT_DEPARTMENT_START, input);

export const getDepartmentSuccess = (output: PagedResultDto<DepartmentResult>) => action(ActionTypes.GET_SELECT_DEPARTMENT_SUCCESS, output);

export const getDepartmentError = () => action(ActionTypes.GET_SELECT_DEPARTMENT_ERROR);

export const createEmployeeStart = (input: CreateEmployee) => action(ActionTypes.CREATE_EMPLOYEE_START, input);

export const createEmployeeSuccess = () => action(ActionTypes.CREATE_EMPLOYEE_SUCCESS);

export const createEmployeeError = () => action(ActionTypes.CREATE_EMPLOYEE_ERROR);

export const updateEmployeeStart = (input: UpdateEmployee) => action(ActionTypes.UPDATE_EMPLOYEE_START, input);

export const updateEmployeeSuccess = () => action(ActionTypes.UPDATE_EMPLOYEE_SUCCESS);

export const updateEmployeeError = () => action(ActionTypes.UPDATE_EMPLOYEE_ERROR);

export const resetUpdateCompletedStatus = () => action(ActionTypes.RESET_UPDATE_COMPLETED_STATUS);
