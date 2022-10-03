import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { CardDetailDto } from './dtos/cardDetailDto';

export const toggleAddListButton = () => action(ActionTypes.TOGGLE_ADDLIST_BUTTON);

export const kanbanDrapCardStart = (input:any) => action(ActionTypes.KANBAN_DRAP_CARD_START, input);

export const kanbanDrapCardEnd = (input:any) => action(ActionTypes.KANBAN_DRAP_CARD_END, input);

export const kanbanSelectColor = (input: string) => action(ActionTypes.KANBAN_SELECT_COLOR, input);

export const kanbanSelectLabel = (input:string) => action(ActionTypes.KANBAN_SELECT_LABEL, input);

export const kanbanSelectMember = (input:string) => action(ActionTypes.KANBAN_SELECT_MEMBER, input);

export const togglePopupCardDetail = (input:CardDetailDto) => action(ActionTypes.TOGGLE_POPUP_CARD_DETAIL, input);
// flag to detect whether u click on X button or not
export const togglePopupMember = (flag:boolean) => action(ActionTypes.TOGGLE_POPUP_MEMBER, flag);
// flag to detect whether u click on X button or not
export const togglePopupLabel = (flag:boolean) => action(ActionTypes.TOGGLE_POPUP_LABEL, flag);
