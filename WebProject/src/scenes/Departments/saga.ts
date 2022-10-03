import {
    call,
    put,
    takeLatest,
    race,
} from 'redux-saga/effects';
import { L } from '../../lib/abpUtility';
import { showErrorNotification, showSuccessNotification } from '../../redux/global/actions';

import {
    exportSuccess,
    exportError,
    getListError,
    getListSuccess,
    uploadSuccess,
    uploadError,
    deleteSuccess,
    deleteError,
    getDepartmentDetailSuccess,
    getDepartmentDetailError,
    createNewDepartmentError,
    createNewDepartmentSuccess,
    updateDepartmentSuccess,
    updateDepartmentError,
} from './actions';
import ActionTypes from './constants';
import DepartmentService from './services';

function* requestDownload() {
    try {
        const { output } = yield race({
            output: call(DepartmentService.download),
        });
        if (output) {
            yield put(exportSuccess(output));
        } else {
            yield put(exportError());
        }
    } catch (error) {
        yield put(exportError());
    }
}

function* requestGetList(input: any) {
    try {
        const { output } = yield race({
            output: call(DepartmentService.getDepartmentList, input.payload),
        });
        if (output) {
            yield put(getListSuccess(output));
        } else {
            yield put(getListError());
        }
    } catch (error) {
        yield put(getListError());
    }
}

function* requestUpload(input: any) {
    try {
        const { output } = yield race({
            output: call(DepartmentService.upload, input.payload),
        });
        if (output) {
            if (output.message === null || output.message === '') {
                yield put(uploadSuccess(output));
                yield put(showSuccessNotification({
                    message: L('Common.Success'),
                    description: L('Common.DataUpdated'),
                }));
            } else {
                yield put(uploadError());
                yield put(showErrorNotification({
                    message: L('Common.Error'),
                    description: output.message,
                }));
            }
        } else {
            yield put(uploadError());
        }
    } catch (error) {
        yield put(uploadError());
    }
}

function* requestDelete(input: any) {
    try {
        const { output } = yield race({
            output: call(DepartmentService.delete, input.payload),
        });
        if (output) {
            yield put(deleteSuccess());
        } else {
            yield put(deleteError());
        }
    } catch (error) {
        yield put(deleteError());
    }
}

function* requestGetDetail(input: any) {
    try {
        const { output } = yield race({
            output: call(DepartmentService.getDetail, input.payload),
        });
        if (output) {
            yield put(getDepartmentDetailSuccess(output));
        } else {
            yield put(getDepartmentDetailError());
        }
    } catch (error) {
        yield put(getDepartmentDetailError());
    }
}

function* requestCreateDepartment(input: any) {
    try {
        const { output } = yield race({
            output: call(DepartmentService.createDepartment, input.payload),
        });
        if (output) {
            yield put(createNewDepartmentSuccess());
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.CreateSuccess'),
            }));
        } else {
            yield put(createNewDepartmentError());
        }
    } catch (error) {
        yield put(createNewDepartmentError());
    }
}

function* requestUpdateDepartment(input: any) {
    try {
        const { output } = yield race({
            output: call(DepartmentService.updateDepartment, input.payload),
        });
        if (output) {
            yield put(updateDepartmentSuccess());
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.DataUpdated'),
            }));
        } else {
            yield put(updateDepartmentError());
        }
    } catch (error) {
        yield put(updateDepartmentError());
    }
}

export default function* watchDepartmentScreenAction() {
    yield takeLatest(
        ActionTypes.EXPORT_START,
        requestDownload,
    );
    yield takeLatest(
        ActionTypes.GETLIST_START,
        requestGetList,
    );
    yield takeLatest(
        ActionTypes.UPLOAD_START,
        requestUpload,
    );
    yield takeLatest(
        ActionTypes.DELETE_START,
        requestDelete,
    );
    yield takeLatest(
        ActionTypes.GET_DEPARTMENT_DETAIL_START,
        requestGetDetail,
    );
    yield takeLatest(
        ActionTypes.CREATE_NEW_DEPARTMENT_START,
        requestCreateDepartment,
    );
    yield takeLatest(
        ActionTypes.UPDATE_DEPARTMENT_START,
        requestUpdateDepartment,
    );
}
