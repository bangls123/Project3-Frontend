import { ContactState, ContactActions } from './types';
import ActionTypes from './constants';
import { ContactDto } from './dtos/contactDto';

export const initialState: ContactState = {
    loading: false,
    keyword: '',
    currentPage: 1,
    maxResultCount: 10,
    datas: {
        items: [],
        totalCount: 0,
    },
    reloadF: false,
    downloadLoading: false,
    uploadLoading: false,
    uploadModalOpen: false,
    detailFormOpen: false,
    detailLoading: false,
    contactId: 0,
    contactDetail: {} as ContactDto,
    saveLoading: false,
};

const contactReducer = (
    state: ContactState = initialState,
    action: ContactActions,
) => {
    switch (action.type) {
        case ActionTypes.CHANGE_OPTION_SEARCH:
            return {
                ...state,
                keyword: action.payload.keyword,
                currentPage: action.payload.skipCount,
                maxResultCount: action.payload.maxResultCount,
            };

        case ActionTypes.GET_CONTACTS_START:
            return {
                ...state,
                loading: true,
                datas: [],
            };
        case ActionTypes.GET_CONTACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                datas: action.payload,
            };

        case ActionTypes.TOGGLE_DETAIL_FORM:
            return {
                ...state,
                contactId: action.payload,
                detailFormOpen: !state.detailFormOpen,
                contactDetail: {} as ContactDto,
            };
        case ActionTypes.GET_CONTACT_DETAIL_START:
            return {
                ...state,
                detailLoading: true,
            };
        case ActionTypes.GET_CONTACT_DETAIL_SUCCESS:
            return {
                ...state,
                detailLoading: false,
                contactDetail: action.payload,
            };
        case ActionTypes.GET_CONTACT_DETAIL_ERROR:
            return {
                ...state,
                detailLoading: false,
            };

        case ActionTypes.DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                reloadF: !state.reloadF,
            };

        case ActionTypes.UPDATE_CONTACT_START:
        case ActionTypes.CREATE_CONTACT_START:
            return {
                ...state,
                saveLoading: true,
            };
        case ActionTypes.UPDATE_CONTACT_SUCCESS:
        case ActionTypes.CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                saveLoading: false,
                detailFormOpen: false,
            };
        case ActionTypes.UPDATE_CONTACT_ERROR:
        case ActionTypes.CREATE_CONTACT_ERROR:
            return {
                ...state,
                saveLoading: false,
            };

        case ActionTypes.DOWNLOAD_CONTACTS_START:
            return {
                ...state,
                downloadLoading: true,
            };
        case ActionTypes.DOWNLOAD_CONTACTS_ERROR:
        case ActionTypes.DOWNLOAD_CONTACTS_SUCCESS:
            return {
                ...state,
                downloadLoading: false,
            };

        case ActionTypes.TOGGLE_UPLOAD_MODAL:
            return {
                ...state,
                uploadModalOpen: !state.uploadModalOpen,
            };
        case ActionTypes.UPLOAD_CONTACTS_START:
            return {
                ...state,
                uploadLoading: true,
            };
        case ActionTypes.UPLOAD_CONTACTS_SUCCESS:
            return {
                ...state,
                uploadLoading: false,
                uploadModalOpen: false,
                reloadF: !state.reloadF,
            };
        case ActionTypes.UPLOAD_CONTACTS_ERROR:
            return {
                ...state,
                uploadLoading: false,
            };

        default:
            return state;
    }
};

export default contactReducer;
