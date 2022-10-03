import { action } from 'typesafe-actions';

import { PagedResultDto } from '../../services/dto/pagedResultDto';
import ActionTypes from './constants';
import { ContactDto } from './dtos/contactDto';
import { ContactFilterDto } from './dtos/contactFilterDto';
import EntityDto from '../../services/dto/entityDto';
import { ReportResultDto } from '../../services/dto/reportResultDto';
import { UpdateContactDto } from './dtos/updateContactDto';
import { CreateContactDto } from './dtos/createContactDto';

export const changeOptionSearch = (input: ContactFilterDto) => (
    action(ActionTypes.CHANGE_OPTION_SEARCH, input)
);

export const getContactsStart = (input: ContactFilterDto) => (
    action(ActionTypes.GET_CONTACTS_START, input)
);
export const getContactsSuccess = (input: PagedResultDto<ContactDto>) => (
    action(ActionTypes.GET_CONTACTS_SUCCESS, input)
);
export const getContactsError = () => (
    action(ActionTypes.GET_CONTACTS_ERROR)
);

export const toggleDetailForm = (input: number) => (
    action(ActionTypes.TOGGLE_DETAIL_FORM, input)
);
export const getContactDetailStart = (input: EntityDto) => (
    action(ActionTypes.GET_CONTACT_DETAIL_START, input)
);
export const getContactDetailSuccess = (input: ContactDto) => (
    action(ActionTypes.GET_CONTACT_DETAIL_SUCCESS, input)
);
export const getContactDetailError = () => (
    action(ActionTypes.GET_CONTACT_DETAIL_ERROR)
);

export const deleteContactStart = (input: EntityDto) => (
    action(ActionTypes.DELETE_CONTACT_START, input)
);
export const deleteContactSuccess = () => (
    action(ActionTypes.DELETE_CONTACT_SUCCESS)
);
export const deleteContactError = () => (
    action(ActionTypes.DELETE_CONTACT_ERROR)
);

export const updateContactStart = (input: UpdateContactDto) => (
    action(ActionTypes.UPDATE_CONTACT_START, input)
);
export const updateContactSuccess = () => (
    action(ActionTypes.UPDATE_CONTACT_SUCCESS)
);
export const updateContactError = () => (
    action(ActionTypes.UPDATE_CONTACT_ERROR)
);

export const createContactStart = (input: CreateContactDto) => (
    action(ActionTypes.CREATE_CONTACT_START, input)
);
export const createContactSuccess = () => (
    action(ActionTypes.CREATE_CONTACT_SUCCESS)
);
export const createContactError = () => (
    action(ActionTypes.CREATE_CONTACT_ERROR)
);

export const downloadContactsStart = () => (
    action(ActionTypes.DOWNLOAD_CONTACTS_START)
);
export const downloadContactsSuccess = (input: ReportResultDto) => (
    action(ActionTypes.DOWNLOAD_CONTACTS_SUCCESS, input)
);
export const downloadContactsError = () => (
    action(ActionTypes.DOWNLOAD_CONTACTS_ERROR)
);

export const toggleUploadModal = () => (
    action(ActionTypes.TOGGLE_UPLOAD_MODAL)
);
export const uploadContactsStart = (input: File[]) => (
    action(ActionTypes.UPLOAD_CONTACTS_START, input)
);
export const uploadContactsSuccess = (input: ReportResultDto) => (
    action(ActionTypes.UPLOAD_CONTACTS_SUCCESS, input)
);
export const uploadContactsError = (input: ReportResultDto) => (
    action(ActionTypes.UPLOAD_CONTACTS_ERROR, input)
);
