import { createSelector } from 'reselect';
import { ApplicationRootState } from '../../redux/types';
import { initialState } from './reducer';

const selectKanban = (state: ApplicationRootState) => state.kanban || initialState;

const makeSelectAddListButtonFlag = () => createSelector(selectKanban, (substate) => substate.addListButtonFlag);
const makeSelectReloadF = () => createSelector(selectKanban, (substate) => substate.reloadF);
const makeSelectDatas = () => createSelector(selectKanban, (substate) => substate.datas);
const makeSelectDragInfo = () => createSelector(selectKanban, (substate) => substate.dragInfo);
const makeSelectColors = () => createSelector(selectKanban, (substate) => substate.colors);
const makeSelectColorChecked = () => createSelector(selectKanban, (substate) => substate.colorChecked);
const makeSelectLabels = () => createSelector(selectKanban, (substate) => substate.labels);
const makeSelectLabelChecked = () => createSelector(selectKanban, (substate) => substate.labelChecked);
const makeSelectBoardMembers = () => createSelector(selectKanban, (substate) => substate.boardMembers);
const makeSelectCheckedMember = () => createSelector(selectKanban, (substate) => substate.checkedMember);
const makeSelectCardDetailVisible = () => createSelector(selectKanban, (substate) => substate.cardDetailPopup);
const makeSelectCardDetail = () => createSelector(selectKanban, (substate) => substate.cardDetail);
const makeSelectPopupMember = () => createSelector(selectKanban, (substate) => substate.popupMember);
const makeSelectPopupLabel = () => createSelector(selectKanban, (substate) => substate.popupLabel);

export {
    makeSelectAddListButtonFlag,
    makeSelectReloadF,
    makeSelectDatas,
    makeSelectDragInfo,
    makeSelectColors,
    makeSelectColorChecked,
    makeSelectLabels,
    makeSelectLabelChecked,
    makeSelectBoardMembers,
    makeSelectCheckedMember,
    makeSelectCardDetailVisible,
    makeSelectCardDetail,
    makeSelectPopupMember,
    makeSelectPopupLabel,
};
