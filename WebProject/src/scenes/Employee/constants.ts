enum ActionTypes {
    CHANGE_OPTION_FILTER = '[Employee] Change option filter',

    GET_EMPLOYEE_START = '[Employee] Get employee start',
    GET_EMPLOYEE_SUCCESS = '[Employee] Get employee success',
    GET_EMPLOYEE_ERROR = '[Employee] Get employee error',

    GET_DETAIL_EMPLOYEE_START = '[Employee] Get detail employee start',
    GET_DETAIL_EMPLOYEE_SUCCESS = '[Employee] Get detail employee success',
    GET_DETAIL_EMPLOYEE_ERROR = '[Employee] Get detail employee error',

    DOWNLOAD_EMPLOYEE_START = '[Employee] Download employee start',
    DOWNLOAD_EMPLOYEE_SUCCESS = '[Employee] Download employee success',
    DOWNLOAD_EMPLOYEE_ERROR = '[Employee] Download employee error',

    CREATE_EMPLOYEE_START = '[Employee] Create employee start',
    CREATE_EMPLOYEE_SUCCESS = '[Employee] Create employee success',
    CREATE_EMPLOYEE_ERROR = '[Employee] Create employee error',

    UPDATE_EMPLOYEE_START = '[Employee] Update employee start',
    UPDATE_EMPLOYEE_SUCCESS = '[Employee] Update employee success',
    UPDATE_EMPLOYEE_ERROR = '[Employee] Update employee error',

    DELETE_EMPLOYEE_START = '[Employee] Delete employee start',
    DELETE_EMPLOYEE_SUCCESS = '[Employee] Delete employee success',
    DELETE_EMPLOYEE_ERROR = '[Employee] Delete employee error',

    TOGGLE_UPLOAD_MODAL = '[Employee] Toggle upload modal',
    UPLOAD_EMPLOYEE_START = '[Employee] Upload employee start',
    UPLOAD_EMPLOYEE_SUCCESS = '[Employee] Upload employee success',
    UPLOAD_EMPLOYEE_ERROR = '[Employee] Upload employee error',

    GET_SELECT_DEPARTMENT_START = '[Employee] Get select department start',
    GET_SELECT_DEPARTMENT_SUCCESS = '[Employee] Get select department success',
    GET_SELECT_DEPARTMENT_ERROR = '[Employee] Get select department error',

    RESET_UPDATE_COMPLETED_STATUS = '[Employee] reset update completed status',
}

export default ActionTypes;
