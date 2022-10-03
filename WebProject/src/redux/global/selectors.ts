import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { ApplicationRootState } from '../types';

const selectState = (state: ApplicationRootState) => state.global || initialState;

const makeSelectDefaultTheme = () => createSelector(selectState, (substate) => substate.defaultTheme);
const makeSelectShowSuccessNotification = () => createSelector(selectState, (substate) => substate.showSuccessNotification);
const makeSelectShowErrorNotification = () => createSelector(selectState, (substate) => substate.showErrorNotification);
const makeSelectShowWarningNotification = () => createSelector(selectState, (substate) => substate.showWarningNotification);
const makeSelectNotificationContent = () => createSelector(selectState, (substate) => substate.notificationContent);

export {
    makeSelectDefaultTheme,
    makeSelectShowSuccessNotification,
    makeSelectShowErrorNotification,
    makeSelectShowWarningNotification,
    makeSelectNotificationContent,
};
