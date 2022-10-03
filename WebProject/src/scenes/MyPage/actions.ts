import { action } from 'typesafe-actions';
import { CardMember } from './dtos/cardMember';
import { InputCommentDto } from './dtos/EditComments';
import { CommentResult } from './dtos/CommentsRessult';
import { CardLabels } from './dtos/cardLabels';
import { AddCardLabel } from './dtos/AddCardLabel';
import { LabelsDto } from '../Kanban/dtos/labelsDto';
import { CardMemberData } from './dtos/CardMemberData';
import { CardDto } from './dtos/cardDto';
import { CardInputDto } from './dtos/CardInputDto';
import ActionTypes from './constants';
import { CardList } from './dtos/cardList';
import { AddComments } from './dtos/AddComments';
import EntityDto from '../../services/dto/entityDto';
import { PagedResultDto } from '../../services/dto/pagedResultDto';

export const mypageDrapCardStart = (input: any) => action(ActionTypes.MY_PAGE_DRAP_CARD_START, input);

export const mypageDrapCardEnd = (input: any) => action(ActionTypes.MY_PAGE_DRAP_CARD_END, input);

export const mypageUpdateCardStart = (input: any) => action(ActionTypes.MY_PAGE_UPDATE_CARD_START, input);

export const mypageSelectColor = (input: string) => action(ActionTypes.MYPAGE_SELECT_COLOR, input);

export const togglePopupCardDetail = () => action(ActionTypes.TOGGLE_POPUP_CARD_DETAIL);
// flag to detect whether u click on X button or not
export const togglePopupMember = (flag:boolean) => action(ActionTypes.TOGGLE_POPUP_MEMBER, flag);
// flag to detect whether u click on X button or not
export const togglePopupLabel = (flag:boolean) => action(ActionTypes.TOGGLE_POPUP_LABEL, flag);

export const mypageGetCardStatusStart = (input:number) => action(ActionTypes.MYPAGE_CARDSTATUS_START, input);

export const mypageGetCardStatusSuccess = (output:CardList) => action(ActionTypes.MYPAGE_CARDSTATUS_SUCCESS, output);

export const mypageGetCardStatusError = () => action(ActionTypes.MYPAGE_CARDSTATUS_ERROR);

export const mypageEditListCardStart = (input: CardInputDto) => action(ActionTypes.MYPAGE_PUT_CARD_START, input);

export const mypageEditListCardSuccess = (output:any) => action(ActionTypes.MYPAGE_PUT_CARD_SUCCESS, output);

export const mypageEditListCardError = () => action(ActionTypes.MYPAGE_PUT_CARD_ERROR);

export const mypageGetCardStart = (input: number) => action(ActionTypes.MYPAGE_GET_CARD_START, input);

export const mypageGetCardSuccess = (output: CardDto) => action(ActionTypes.MYPAGE_GET_CARD_SUCCESS, output);

export const mypageGetCardError = () => action(ActionTypes.MYPAGE_GET_CARD_ERROR);

export const mypageStartIdCard = (input: number) => action(ActionTypes.MYPAGE_START_ID_CARD, input);

export const mypageGetCardMemberStart = (input: EntityDto) => action(ActionTypes.MY_PAGE_GET_CARDMEMBER_START, input);

export const mypageGetCardMemberSuccess = (output: CardMemberData) => action(ActionTypes.MY_PAGE_GET_CARDMEMBER_SUCCESS, output);

export const mypageGetCardMemberError = () => action(ActionTypes.MY_PAGE_GET_CARDMEMBER_ERROR);

// labels

export const mypageGetCardLabelStart = (input?: number) => action(ActionTypes.MY_PAGE_GET_CARDLABEL_START, input);

export const mypageGetCardLabelSuccess = (output: CardLabels[]) => action(ActionTypes.MY_PAGE_GET_CARDLABEL_SUCCESS, output);

export const mypageGetCardLabelError = () => action(ActionTypes.MY_PAGE_GET_CARDLABEL_ERROR);

export const mypageGetLabelStart = (input?: string) => action(ActionTypes.MY_PAGE_GET_LABEL_START, input);

export const mypageGetLabelSuccess = (output: LabelsDto[]) => action(ActionTypes.MY_PAGE_GET_LABEL_SUCCESS, output);

export const mypageGetLabelError = () => action(ActionTypes.MY_PAGE_GET_LABEL_ERROR);

export const addCardLabel = (input:any) => action(ActionTypes.MYPAGE_ADD_CARD_LABEL_START, input);

export const addCardLabelSuccess = (output:any) => action(ActionTypes.MYPAGE_ADD_CARD_LABEL_SUCCESS, output);

export const addCardLabelError = () => action(ActionTypes.MYPAGE_ADD_CARD_LABEL_ERROR);

export const deleteCardLabel = (input:number) => action(ActionTypes.MYPAGE_DELETE_CARD_LABEL_START, input);

export const deleteCardLabelSuccess = (output:any) => action(ActionTypes.MYPAGE_DELETE_CARD_LABEL_SUCCESS, output);

export const deleteCardLabelError = () => action(ActionTypes.MYPAGE_DELETE_CARD_LABEL_ERROR);

export const addNewLabel = (input:AddCardLabel) => action(ActionTypes.MYPAGE_ADD_NEW_LABEL_START, input);

export const addNewLabelSuccess = (output:any) => action(ActionTypes.MYPAGE_ADD_NEW_LABEL_SUCCESS, output);

export const addNewLabelError = () => action(ActionTypes.MYPAGE_ADD_NEW_LABEL_ERROR);

// comment

export const deleteCommentStart = (input:number) => action(ActionTypes.MYPAGE_DELETE_COMMENT_START, input);

export const deleteCommentSuccess = (output:any) => action(ActionTypes.MYPAGE_DELETE_COMMENT_SUCCESS, output);

export const deleteCommentError = () => action(ActionTypes.MYPAGE_DELETE_COMMENT_ERROR);

export const editCommentStart = (input:InputCommentDto) => action(ActionTypes.MYPAGE_EDIT_COMMENT_START, input);

export const editCommentSuccess = (output:any) => action(ActionTypes.MYPAGE_EDIT_COMMENT_SUCCESS, output);

export const editCommentError = () => action(ActionTypes.MYPAGE_EDIT_COMMENT_ERROR);

export const mypageAddCommentsStart = (input: AddComments) => action(ActionTypes.MY_PAGE_ADD_COMMENTS_START, input);

export const mypageAddCommentsSuccess = (output: CommentResult) => action(ActionTypes.MY_PAGE_ADD_COMMENTS_SUCCESS, output);

export const mypageAddCommentsError = () => action(ActionTypes.MY_PAGE_ADD_COMMENTS_ERROR);
// member

export const addCardMember = (input:any) => action(ActionTypes.MYPAGE_ADD_CARD_MEMBER_START, input);

export const addCardMemberSuccess = (output:any) => action(ActionTypes.MYPAGE_ADD_CARD_MEMBER_SUCCESS, output);

export const addCardMemberError = () => action(ActionTypes.MYPAGE_ADD_CARD_MEMBER_ERROR);

export const getListMembers = (input: any) => action(ActionTypes.MYPAGE_GET_LIST_MEMBERS_START, input);

export const getListMembersSuccess = (output: PagedResultDto<CardMember>) => action(ActionTypes.MYPAGE_GET_LIST_MEMBERS_SUCCESS, output);

export const getListMembersError = () => action(ActionTypes.MYPAGE_GET_LIST_MEMBERS_ERROR);

export const deleteCardMember = (input:number) => action(ActionTypes.MYPAGE_DELETE_CARD_MEMBER_START, input);

export const deleteCardMemberSuccess = (output:any) => action(ActionTypes.MYPAGE_DELETE_CARD_MEMBER_SUCCESS, output);

export const deleteCardMemberError = () => action(ActionTypes.MYPAGE_DELETE_CARD_MEMBER_ERROR);

export const moveCardSuccess = (output:CardDto) => action(ActionTypes.MYPAGE_MOVE_CARD_SUCCESS, output);

export const moveCardError = () => action(ActionTypes.MYPAGE_MOVE_CARD_ERROR);
