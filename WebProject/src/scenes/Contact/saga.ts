import {
    call,
    put,
    takeLatest,
    race,
} from 'redux-saga/effects';

import {
    getContactsSuccess,
    getContactsError,
    getContactDetailSuccess,
    getContactDetailError,
    deleteContactSuccess,
    deleteContactError,
    updateContactSuccess,
    updateContactError,
    createContactSuccess,
    createContactError,
    downloadContactsSuccess,
    downloadContactsError,
    uploadContactsSuccess,
    uploadContactsError,
} from './actions';
import {
    showSuccessNotification,
    showErrorNotification,
} from '../../redux/global/actions';
import ActionTypes from './constants';
import contactService from './services';
import { L } from '../../lib/abpUtility';

function* getContacts(input: any) {
    try {
        const { output } = yield race({
            output: call(contactService.getAll, input.payload),
        });
        if (output) {
            yield put(getContactsSuccess(output));
        } else {
            yield put(getContactsError());
        }
    } catch (error) {
        yield put(getContactsError());
    }
}

function* getContactDetail(input: any) {
    try {
        const { output } = yield race({
            output: call(contactService.getDetail, input.payload),
        });
        if (output) {
            yield put(getContactDetailSuccess(output));
        } else {
            yield put(getContactDetailError());
        }
    } catch (error) {
        yield put(getContactDetailError());
    }
}

function* deleteContact(input: any) {
    try {
        const { output } = yield race({
            output: call(contactService.delete, input.payload),
        });
        if (output) {
            yield put(deleteContactSuccess());
        } else {
            yield put(deleteContactError());
        }
    } catch (error) {
        yield put(deleteContactError());
    }
}

function* updateContact(input: any) {
    try {
        const { output } = yield race({
            output: call(contactService.update, input.payload),
        });
        if (output) {
            yield put(updateContactSuccess());
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.DataUpdated'),
            }));
        } else {
            yield put(updateContactError());
        }
    } catch (error) {
        yield put(updateContactError());
    }
}

function* createContact(input: any) {
    try {
        const { output } = yield race({
            output: call(contactService.create, input.payload),
        });
        if (output) {
            yield put(createContactSuccess());
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.CreateSuccess'),
            }));
        } else {
            yield put(createContactError());
        }
    } catch (error) {
        yield put(createContactError());
    }
}

function* downloadContacts() {
    try {
        const { output } = yield race({
            output: call(contactService.download),
        });
        if (output) {
            yield put(downloadContactsSuccess(output));
        } else {
            yield put(downloadContactsError());
        }
    } catch (error) {
        yield put(downloadContactsError());
    }
}

function* uploadContacts(input: any) {
    const { output } = yield race({
        output: call(contactService.upload, input.payload),
    });
    if (output) {
        yield put(uploadContactsSuccess(output));
        if (output.message === null || output.message === '') {
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.DataUpdated'),
            }));
        } else {
            yield put(showErrorNotification({
                message: L('Common.Error'),
                description: output.message,
            }));
        }
    } else {
        yield put(uploadContactsError(output));
    }
}

export default function* watchContactScreenAction() {
    yield takeLatest(
        ActionTypes.GET_CONTACTS_START,
        getContacts,
    );
    yield takeLatest(
        ActionTypes.GET_CONTACT_DETAIL_START,
        getContactDetail,
    );
    yield takeLatest(
        ActionTypes.DELETE_CONTACT_START,
        deleteContact,
    );
    yield takeLatest(
        ActionTypes.UPDATE_CONTACT_START,
        updateContact,
    );
    yield takeLatest(
        ActionTypes.CREATE_CONTACT_START,
        createContact,
    );
    yield takeLatest(
        ActionTypes.DOWNLOAD_CONTACTS_START,
        downloadContacts,
    );
    yield takeLatest(
        ActionTypes.UPLOAD_CONTACTS_START,
        uploadContacts,
    );
}
