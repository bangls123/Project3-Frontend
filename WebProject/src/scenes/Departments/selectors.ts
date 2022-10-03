import { createSelector } from 'reselect';
import { ApplicationRootState } from '../../redux/types';
import { initialState } from './reducer';

const selectDepartments = (state: ApplicationRootState) => state.departments || initialState;

const makeSelectDepartmentsList = () => createSelector(selectDepartments, (substate) => substate.departmentData);
const makeSelectLoading = () => createSelector(selectDepartments, (substate) => substate.loading);
const makeSelectUpdateReload = () => createSelector(selectDepartments, (substate) => substate.updateReload);
const makeSelectUploadModalVisible = () => createSelector(selectDepartments, (substate) => substate.uploadModalVisible);
const makeSelectUploadLoading = () => createSelector(selectDepartments, (substate) => substate.uploadLoading);
const makeSelectDownloadLoading = () => createSelector(selectDepartments, (substate) => substate.downloadLoading);
const makeSelectDepartmentDetail = () => createSelector(selectDepartments, (substate) => substate.departmentDetail);
const makeSelectUpdateLoading = () => createSelector(selectDepartments, (substate) => substate.updateLoading);
const makeSelectUpdateCompleted = () => createSelector(selectDepartments, (substate) => substate.updateCompleted);

export {
    makeSelectDepartmentsList,
    makeSelectLoading,
    makeSelectUpdateReload,
    makeSelectUploadModalVisible,
    makeSelectUploadLoading,
    makeSelectDownloadLoading,
    makeSelectDepartmentDetail,
    makeSelectUpdateLoading,
    makeSelectUpdateCompleted,
};
