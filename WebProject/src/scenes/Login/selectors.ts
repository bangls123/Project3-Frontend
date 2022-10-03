import { createSelector } from 'reselect';

import { ApplicationRootState } from '../../redux/types';
import { initialState } from './reducer';

const selectLogin = (state: ApplicationRootState) => state.login || initialState;

const makeSelectLoading = () => createSelector(selectLogin, (substate) => substate.loading);
const makeSelectCompleted = () => createSelector(selectLogin, (substate) => substate.completed);

export {
    makeSelectLoading,
    makeSelectCompleted,
};
