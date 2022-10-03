import { action } from 'typesafe-actions';
import { UploadFile } from 'antd/lib/upload/interface';
import ActionTypes from './constants';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { DepartmentsData } from './dtos/departmentsData';
import { ReportResultDto } from '../../services/dto/reportResultDto';
import { DepartmentsFilter } from './dtos/departmentsFilter';
import { CreateDepartmentDto } from './dtos/createDepartmentDto';

export const exportStart = () => action(ActionTypes.EXPORT_START);

export const exportSuccess = (output: ReportResultDto) => action(ActionTypes.EXPORT_SUCCESS, output);

export const exportError = () => action(ActionTypes.EXPORT_ERROR);

export const getListStart = (input: DepartmentsFilter) => action(ActionTypes.GETLIST_START, input);

export const getListSuccess = (output: PagedResultDto<DepartmentsData>) => (
    action(ActionTypes.GETLIST_SUCCESS, output)
);

export const getListError = () => action(ActionTypes.GETLIST_ERROR);

export const toggleUploadModal = () => action(ActionTypes.TOGGLE_UPLOAD_MODAL);

export const uploadStart = (input: UploadFile[]) => action(ActionTypes.UPLOAD_START, input);

export const uploadSuccess = (output: ReportResultDto) => action(ActionTypes.UPLOAD_SUCCESS, output);

export const uploadError = () => action(ActionTypes.UPLOAD_ERROR);

export const deleteStart = (input: number) => action(ActionTypes.DELETE_START, input);

export const deleteSuccess = () => action(ActionTypes.DELETE_SUCCESS);

export const deleteError = () => action(ActionTypes.DELETE_ERROR);

export const getDepartmentDetailStart = (input: string) => action(ActionTypes.GET_DEPARTMENT_DETAIL_START, input);

export const getDepartmentDetailSuccess = (output: DepartmentsData) => action(ActionTypes.GET_DEPARTMENT_DETAIL_SUCCESS, output);

export const getDepartmentDetailError = () => action(ActionTypes.GET_DEPARTMENT_DETAIL_ERROR);

export const createNewDepartmentStart = (input: CreateDepartmentDto) => action(ActionTypes.CREATE_NEW_DEPARTMENT_START, input);

export const createNewDepartmentSuccess = () => action(ActionTypes.CREATE_NEW_DEPARTMENT_SUCCESS);

export const createNewDepartmentError = () => action(ActionTypes.CREATE_NEW_DEPARTMENT_ERROR);

export const updateDepartmentStart = (input: DepartmentsData) => action(ActionTypes.UPDATE_DEPARTMENT_START, input);

export const updateDepartmentSuccess = () => action(ActionTypes.UPDATE_DEPARTMENT_SUCCESS);

export const updateDepartmentError = () => action(ActionTypes.UPDATE_DEPARTMENT_ERROR);

export const resetUpdateCompletedStatus = () => action(ActionTypes.RESET_UPDATE_COMPLETED_STATUS);
