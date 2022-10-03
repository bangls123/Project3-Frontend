import {
    call,
    put,
    race,
    takeLatest,
} from 'redux-saga/effects';
import { L } from '../../lib/abpUtility';
import { showErrorNotification, showSuccessNotification } from '../../redux/global/actions';
import {
    createEmployeeError,
    createEmployeeSuccess,
    deleteEmployeeError,
    deleteEmployeeSuccess,
    downloadEmployError,
    downloadEmploySuccess,
    getDepartmentError,
    getDepartmentSuccess,
    getDetailEmployeesError,
    getDetailEmployeesSuccess,
    getEmployeesError,
    getEmployeesSuccess,
    updateEmployeeError,
    updateEmployeeSuccess,
    uploadEmployeeError,
    uploadEmployeeSuccess,
} from './actions';
import ActionTypes from './constants';
import EmployServices from './services';

function* getEmployee(input: any) {
    try {
        const { output } = yield race({
            output: call(EmployServices.getAll, input.payload),
        });
        if (output) {
            yield put(getEmployeesSuccess(output));
        } else {
            yield put(getEmployeesError());
        }
    } catch (error) {
        yield put(getEmployeesError());
    }
}

function* getEmployeeDetail(input: any) {
    try {
        const { output } = yield race({
            output: call(EmployServices.getDetail, input.payload),
        });
        if (output) {
            yield put(getDetailEmployeesSuccess(output));
        } else {
            yield put(getDetailEmployeesError());
        }
    } catch (error) {
        yield put(getDetailEmployeesError());
    }
}

function* getDepartment(input: any) {
    try {
        const { output } = yield race({
            output: call(EmployServices.getAllDepartment, input.payload),
        });
        if (output) {
            yield put(getDepartmentSuccess(output));
        } else {
            yield put(getDepartmentError());
        }
    } catch (error) {
        yield put(getDepartmentError());
    }
}

function* createEmployee(input: any) {
    try {
        const { output } = yield race({
            output: call(EmployServices.create, input.payload),
        });
        if (output) {
            yield put(createEmployeeSuccess());
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.CreateSuccess'),
            }));
        } else {
            yield put(createEmployeeError());
        }
    } catch (error) {
        yield put(createEmployeeError());
    }
}

function* updateEmployee(input: any) {
    try {
        const { output } = yield race({
            output: call(EmployServices.update, input.payload),
        });
        if (output) {
            yield put(updateEmployeeSuccess());
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.DataUpdated'),
            }));
        } else {
            yield put(updateEmployeeError());
        }
    } catch (error) {
        yield put(updateEmployeeError());
    }
}

function* downloadEmployee() {
    try {
        const { output } = yield race({
            output: call(EmployServices.download),
        });
        if (output) {
            yield put(downloadEmploySuccess(output));
        } else {
            yield put(downloadEmployError());
        }
    } catch (error) {
        yield put(downloadEmployError());
    }
}

function* deleteEmployee(input: any) {
    try {
        const { output } = yield race({
            output: call(EmployServices.delete, input.payload),
        });
        if (output) {
            yield put(deleteEmployeeSuccess());
        } else {
            yield put(deleteEmployeeError());
        }
    } catch (error) {
        yield put(deleteEmployeeError());
    }
}

function* uploadEmployee(input: any) {
    const { output } = yield race({
        output: call(EmployServices.upload, input.payload),
    });
    if (output) {
        if (output.message === null || output.message === '') {
            yield put(uploadEmployeeSuccess(output));
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.DataUpdated'),
            }));
        } else {
            yield put(showErrorNotification({
                message: L('Common.Error'),
                description: output.message,
            }));
            yield put(uploadEmployeeError());
        }
    } else {
        yield put(uploadEmployeeError());
    }
}

export default function* watchEmployeeScreenAction() {
    yield takeLatest(
        ActionTypes.GET_EMPLOYEE_START,
        getEmployee,
    );
    yield takeLatest(
        ActionTypes.DOWNLOAD_EMPLOYEE_START,
        downloadEmployee,
    );
    yield takeLatest(
        ActionTypes.DELETE_EMPLOYEE_START,
        deleteEmployee,
    );
    yield takeLatest(
        ActionTypes.UPLOAD_EMPLOYEE_START,
        uploadEmployee,
    );
    yield takeLatest(
        ActionTypes.GET_SELECT_DEPARTMENT_START,
        getDepartment,
    );
    yield takeLatest(
        ActionTypes.GET_DETAIL_EMPLOYEE_START,
        getEmployeeDetail,
    );
    yield takeLatest(
        ActionTypes.CREATE_EMPLOYEE_START,
        createEmployee,
    );
    yield takeLatest(
        ActionTypes.UPDATE_EMPLOYEE_START,
        updateEmployee,
    );
}
