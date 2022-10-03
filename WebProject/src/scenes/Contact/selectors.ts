import { createSelector } from 'reselect';

import { ApplicationRootState } from '../../redux/types';
import { initialState } from './reducer';

const selectContact = (state: ApplicationRootState) => state.contact || initialState;

const makeSelectLoading = () => createSelector(selectContact, (substate) => substate.loading);
const makeSelectKeyword = () => createSelector(selectContact, (substate) => substate.keyword);
const makeSelectCurrentPage = () => createSelector(selectContact, (substate) => substate.currentPage);
const makeSelectMaxResultCount = () => createSelector(selectContact, (substate) => substate.maxResultCount);
const makeSelectDatas = () => createSelector(selectContact, (substate) => substate.datas);
const makeSelectReloadF = () => createSelector(selectContact, (substate) => substate.reloadF);
const makeSelectDownloadLoading = () => createSelector(selectContact, (substate) => substate.downloadLoading);
const makeSelectUploadLoading = () => createSelector(selectContact, (substate) => substate.uploadLoading);
const makeSelectUploadModalOpen = () => createSelector(selectContact, (substate) => substate.uploadModalOpen);
const makeSelectDetailFormOpen = () => createSelector(selectContact, (substate) => substate.detailFormOpen);
const makeSelectDetailLoading = () => createSelector(selectContact, (substate) => substate.detailLoading);
const makeSelectContactId = () => createSelector(selectContact, (substate) => substate.contactId);
const makeSelectContactDetail = () => createSelector(selectContact, (substate) => substate.contactDetail);
const makeSelectSaveLoading = () => createSelector(selectContact, (substate) => substate.saveLoading);

export {
    makeSelectLoading,
    makeSelectKeyword,
    makeSelectCurrentPage,
    makeSelectMaxResultCount,
    makeSelectDatas,
    makeSelectReloadF,
    makeSelectDownloadLoading,
    makeSelectUploadLoading,
    makeSelectUploadModalOpen,
    makeSelectDetailFormOpen,
    makeSelectDetailLoading,
    makeSelectContactId,
    makeSelectContactDetail,
    makeSelectSaveLoading,
};
