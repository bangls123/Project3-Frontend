import { createSelector } from 'reselect';
import { ApplicationRootState } from '../../redux/types';
import { initialState } from './reducer';

const selectMypage = (state:ApplicationRootState) => state.mypage || initialState;

const makeSelectReloadF = () => createSelector(selectMypage, (substate) => substate.reloadF);
const makeSelectDatas = () => createSelector(selectMypage, (substate) => substate.datas);
const makeSelectDragInfo = () => createSelector(selectMypage, (substate) => substate.dragInfo);
const makeSelectColors = () => createSelector(selectMypage, (substate) => substate.colors);
const makeSelectColorChecked = () => createSelector(selectMypage, (substate) => substate.colorChecked);
const makeSelectLabels = () => createSelector(selectMypage, (substate) => substate.cardDetail.cardLabels);
const makeSelectCardDetailVisible = () => createSelector(selectMypage, (substate) => substate.cardDetailPopup);
const makeSelectCardDetail = () => createSelector(selectMypage, (substate) => substate.cardDetail);
const makeSelectPopupMember = () => createSelector(selectMypage, (substate) => substate.popupMember);
const makeSelectPopupLabel = () => createSelector(selectMypage, (substate) => substate.popupLabel);
const makeSelectLoading = () => createSelector(selectMypage, (subsate) => subsate.loading);
const makeSelectgetCardCompleted = () => createSelector(selectMypage, (subsate) => subsate.getCardCompleted);
const makeSelectgetCardMember = () => createSelector(selectMypage, (substate) => substate.cardMemberDatas);
const makeSelectLabelLoading = () => createSelector(selectMypage, (substate) => substate.labelLoading);
const makeSelectCardLabelLoading = () => createSelector(selectMypage, (substate) => substate.labels);

export {
    makeSelectReloadF,
    makeSelectDatas,
    makeSelectDragInfo,
    makeSelectColors,
    makeSelectColorChecked,
    makeSelectLabels,
    makeSelectCardDetailVisible,
    makeSelectCardDetail,
    makeSelectPopupMember,
    makeSelectPopupLabel,
    makeSelectLoading,
    makeSelectgetCardCompleted,
    makeSelectgetCardMember,
    makeSelectLabelLoading,
    makeSelectCardLabelLoading,
};
