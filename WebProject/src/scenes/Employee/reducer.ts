import ActionTypes from './constants';
import { DetailEmployee } from './dtos/detailEmployee';
import { EmployActions, EmployeeState } from './types';

export const initialState: EmployeeState = {
    loading: false,
    keyword: '',
    currentPage: 1,
    maxResultCount: 10,
    downloadLoading: false,
    uploadLoading: false,
    uploadModalOpen: false,
    reloadF: false,
    detailLoading: false,
    saveLoading: false,
    updateCompleted: false,
    loadingDepartment: false,
    employeeDetail: {} as DetailEmployee,
    departmentDatas: {
        items: [],
        totalCount: 0,
    },
    datas: {
        items: [],
        totalCount: 0,
    },
};

const employeeReducer = (
    state: EmployeeState = initialState,
    action: EmployActions,
) => {
    switch (action.type) {
        case ActionTypes.CHANGE_OPTION_FILTER:
            return {
                ...state,
                keyword: action.payload.keyword,
                currentPage: action.payload.skipCount,
                maxResultCount: action.payload.maxResultCount,
            };

        case ActionTypes.GET_EMPLOYEE_START:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.GET_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                datas: action.payload,
            };
        case ActionTypes.GET_EMPLOYEE_ERROR:
            return {
                ...state,
                loading: false,
            };

        case ActionTypes.GET_SELECT_DEPARTMENT_START:
            return {
                ...state,
                loadingDepartment: true,
            };
        case ActionTypes.GET_SELECT_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loadingDepartment: false,
                departmentDatas: action.payload,
            };
        case ActionTypes.GET_SELECT_DEPARTMENT_ERROR:
            return {
                ...state,
                loadingDepartment: true,
            };

        case ActionTypes.GET_DETAIL_EMPLOYEE_START:
            return {
                ...state,
                detailLoading: true,
            };
        case ActionTypes.GET_DETAIL_EMPLOYEE_SUCCESS:
            return {
                ...state,
                detailLoading: false,
                employeeDetail: action.payload,
            };
        case ActionTypes.GET_DETAIL_EMPLOYEE_ERROR:
            return {
                ...state,
                detailLoading: false,
            };

        case ActionTypes.UPDATE_EMPLOYEE_START:
        case ActionTypes.CREATE_EMPLOYEE_START:
            return {
                ...state,
                saveLoading: true,
                updateCompleted: false,
            };
        case ActionTypes.UPDATE_EMPLOYEE_SUCCESS:
        case ActionTypes.CREATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                saveLoading: false,
                updateCompleted: true,
            };
        case ActionTypes.UPDATE_EMPLOYEE_ERROR:
        case ActionTypes.CREATE_EMPLOYEE_ERROR:
            return {
                ...state,
                saveLoading: false,
            };

        case ActionTypes.DOWNLOAD_EMPLOYEE_START:
            return {
                ...state,
                downloadLoading: true,
            };
        case ActionTypes.DOWNLOAD_EMPLOYEE_ERROR:
        case ActionTypes.DOWNLOAD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                downloadLoading: false,
            };

        case ActionTypes.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                reloadF: !state.reloadF,
            };

        case ActionTypes.TOGGLE_UPLOAD_MODAL:
            return {
                ...state,
                uploadModalOpen: !state.uploadModalOpen,
            };

        case ActionTypes.UPLOAD_EMPLOYEE_START:
            return {
                ...state,
                uploadLoading: true,
            };
        case ActionTypes.UPLOAD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                uploadLoading: false,
                uploadModalOpen: false,
                reloadF: !state.reloadF,
            };
        case ActionTypes.UPLOAD_EMPLOYEE_ERROR:
            return {
                ...state,
                uploadLoading: false,
            };
        case ActionTypes.RESET_UPDATE_COMPLETED_STATUS:
            return {
                ...state,
                updateCompleted: false,
            };
        default:
            return state;
    }
};

export default employeeReducer;
