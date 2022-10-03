import { createSelector } from 'reselect';
import { ApplicationRootState } from '../../redux/types';
import { initialState } from './reducer';

const selectEmployee = (state: ApplicationRootState) => state.employee || initialState;
const makeSelectLoading = () => createSelector(selectEmployee, (substate) => substate.loading);
const makeSelectKeyword = () => createSelector(selectEmployee, (substate) => substate.keyword);
const makeSelectDownloadLoading = () => createSelector(selectEmployee, (substate) => substate.downloadLoading);
const makeSelectUploadLoading = () => createSelector(selectEmployee, (substate) => substate.uploadLoading);
const makeSelectReloadF = () => createSelector(selectEmployee, (substate) => substate.reloadF);
const makeSelectUploadModalOpen = () => createSelector(selectEmployee, (substate) => substate.uploadModalOpen);
const makeSelectDatas = () => createSelector(selectEmployee, (substate) => substate.datas);
const makeSelectDepartmentDatas = () => createSelector(selectEmployee, (substate) => substate.departmentDatas);
const makeSelectDetailEmployeeDatas = () => createSelector(selectEmployee, (substate) => substate.employeeDetail);
const makeSelectDetailLoading = () => createSelector(selectEmployee, (substate) => substate.detailLoading);
const makeSelectDetailSaveLoading = () => createSelector(selectEmployee, (substate) => substate.saveLoading);
const makeSelectDetailUpdateCompleted = () => createSelector(selectEmployee, (substate) => substate.updateCompleted);
const makeSelectSkipcount = () => createSelector(selectEmployee, (substate) => substate.currentPage);
const makeSelectmaxResultCount = () => createSelector(selectEmployee, (substate) => substate.maxResultCount);
const makeSelectloadingDepartment = () => createSelector(selectEmployee, (substate) => substate.loadingDepartment);

export {
    makeSelectDownloadLoading,
    makeSelectLoading,
    makeSelectDatas,
    makeSelectUploadLoading,
    makeSelectReloadF,
    makeSelectUploadModalOpen,
    makeSelectDepartmentDatas,
    makeSelectDetailEmployeeDatas,
    makeSelectDetailLoading,
    makeSelectDetailSaveLoading,
    makeSelectDetailUpdateCompleted,
    makeSelectKeyword,
    makeSelectSkipcount,
    makeSelectmaxResultCount,
    makeSelectloadingDepartment,
};
