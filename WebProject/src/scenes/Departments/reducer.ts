import ActionTypes from './constants';
import { DepartmentsData } from './dtos/departmentsData';
import { DepartmentsState, DepartmentsActions } from './types';

export const initialState: DepartmentsState = {
    loading: false,
    updateReload: false,
    downloadLoading: false,
    uploadModalVisible: false,
    uploadLoading: false,
    departmentData: {
        items: [],
        totalCount: 0,
    },
    departmentDetail: {} as DepartmentsData,
    updateLoading: false,
    updateCompleted: false,
};
const departmentReducer = (
    state: DepartmentsState = initialState,
    action: DepartmentsActions,
) => {
    switch (action.type) {
        case ActionTypes.EXPORT_START:
            return {
                ...state,
                downloadLoading: true,
            };
        case ActionTypes.EXPORT_SUCCESS:
            return {
                ...state,
                downloadLoading: false,
            };
        case ActionTypes.EXPORT_ERROR:
            return {
                ...state,
                downloadLoading: false,
            };
        case ActionTypes.GETLIST_START:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.GETLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                departmentData: action.payload,
            };
        case ActionTypes.GETLIST_ERROR:
            return {
                ...state,
                loading: false,
            };
        case ActionTypes.TOGGLE_UPLOAD_MODAL:
            return {
                ...state,
                uploadModalVisible: !state.uploadModalVisible,
            };
        case ActionTypes.UPLOAD_START:
            return {
                ...state,
                uploadLoading: true,
            };
        case ActionTypes.UPLOAD_SUCCESS:
            return {
                ...state,
                uploadLoading: false,
                uploadModalVisible: false,
                updateReload: !state.updateReload,
            };
        case ActionTypes.UPLOAD_ERROR:
            return {
                ...state,
                uploadLoading: false,
            };
        case ActionTypes.DELETE_SUCCESS:
            return {
                ...state,
                updateReload: !state.updateReload,
            };
        case ActionTypes.GET_DEPARTMENT_DETAIL_SUCCESS:
            return {
                ...state,
                departmentDetail: action.payload,
            };
        case ActionTypes.CREATE_NEW_DEPARTMENT_START:
            return {
                ...state,
                updateLoading: true,
                updateCompleted: false,
            };
        case ActionTypes.CREATE_NEW_DEPARTMENT_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                updateCompleted: true,
            };
        case ActionTypes.CREATE_NEW_DEPARTMENT_ERROR:
            return {
                ...state,
                updateLoading: false,
            };
        case ActionTypes.UPDATE_DEPARTMENT_START:
            return {
                ...state,
                updateLoading: true,
                updateCompleted: false,
            };
        case ActionTypes.UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                updateCompleted: true,
            };
        case ActionTypes.UPDATE_DEPARTMENT_ERROR:
            return {
                ...state,
                updateLoading: false,
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

export default departmentReducer;
