import moment from 'moment';
import { CardLabels } from './dtos/cardLabels';
import { CardMemberData } from './dtos/CardMemberData';
import { CardDto } from './dtos/cardDto';
import ActionTypes from './constants';
import { CardList } from './dtos/cardList';
import { MypageActions, MypageState } from './types';
import { CardMember } from './dtos/cardMember';

export const initialState: MypageState = {
    labels: [] as CardLabels[],
    reloadF: false,
    cardDetailPopup: false,
    cardDetail: {} as CardDto,
    popupMember: false,
    popupLabel: false,
    loading: false,
    datas: [] as CardList[],
    cardMemberDatas: [] as CardMemberData[],
    getCardCompleted: false,
    colors: [
        {
            color: '#70ad47',
        },
        {
            color: '#ffbf00',
        },
        {
            color: '#c55911',
        },
        {
            color: '#ff0000',
        },
        {
            color: '#6f30a0',
        },
        {
            color: '#5b9bd5',
        },
        {
            color: '#00b0f0',
        },
        {
            color: '#A9D18E',
        },
        {
            color: '#B57BA4',
        },
        {
            color: '#262626',
        },
    ],
    colorChecked: '#70ad47',
    labelLoading: false,
    dragInfo: null,
};

function MypgaeReducer(
    state: MypageState = initialState,
    action: MypageActions,
) {
    switch (action.type) {
        case ActionTypes.MY_PAGE_DRAP_CARD_START:
            return {
                ...state,
                dragInfo: action.payload,
            };

        case ActionTypes.MYPAGE_SELECT_COLOR:
            return {
                ...state,
                colorChecked: action.payload,
            };

        case ActionTypes.TOGGLE_POPUP_CARD_DETAIL:
            return {
                ...state,
                cardDetailPopup: !state.cardDetailPopup,
                getCardCompleted: false,
            };

        case ActionTypes.MYPAGE_MOVE_CARD_SUCCESS: {
            const listStartIndex = state.datas.findIndex((item:any) => item.id === state.dragInfo.fromList);
            const addCard = state.datas[listStartIndex].cards.filter((item:any) => item.id === action.payload.id);
            const newCard = state.datas[listStartIndex].cards.filter((item:any) => item.id !== state.dragInfo.taskId);
            state.datas[listStartIndex].cards = newCard;
            const listTargetIndex = state.datas.findIndex((item:any) => item.id === action.payload.cardStatusId);
            state.datas[listTargetIndex].cards.push(...addCard);
            return {
                ...state,
                reloadF: !state.reloadF,
            };
        }
        case ActionTypes.MYPAGE_GET_CARD_START:
            return {
                ...state,
                getCardCompleted: false,
                cardDetail: {},
            };
        case ActionTypes.MYPAGE_GET_CARD_SUCCESS:
            return {
                ...state,
                cardDetail: action.payload,
                getCardCompleted: true,
            };
        case ActionTypes.MYPAGE_GET_CARD_ERROR:
            return {
                ...state,
                getCardCompleted: false,
                cardDetail: {},
            };

        case ActionTypes.MY_PAGE_ADD_COMMENTS_START:
            return {
                ...state,
            };
        case ActionTypes.MY_PAGE_ADD_COMMENTS_SUCCESS:
            state.cardDetail.cardComments.push({
                detail: action.payload.detail,
                employeeId: action.payload.employeeId,
                createDate: moment().format(),
                updateDate: '',
                cardCommentId: action.payload.id,
            });
            return {
                ...state,
                reloadF: !state.reloadF,
            };
        case ActionTypes.MY_PAGE_ADD_COMMENTS_ERROR:
            return {
                ...state,
            };

        case ActionTypes.MY_PAGE_GET_CARDMEMBER_START:
            return {
                ...state,
            };
        case ActionTypes.MY_PAGE_GET_CARDMEMBER_ERROR:
            return {
                ...state,
            };

        case ActionTypes.TOGGLE_POPUP_MEMBER:
            return {
                ...state,
                popupMember: action.payload,
                popupLabel: false,
            };
        case ActionTypes.TOGGLE_POPUP_LABEL:
            return {
                ...state,
                popupMember: false,
                popupLabel: action.payload,
            };

        case ActionTypes.MYPAGE_CARDSTATUS_START:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.MYPAGE_CARDSTATUS_SUCCESS:
            return {
                ...state,
                datas: action.payload,
                loading: false,
            };
        case ActionTypes.MYPAGE_CARDSTATUS_ERROR:
            return {
                ...state,
                loading: false,
            };

        case ActionTypes.MYPAGE_PUT_CARD_START:
            return {
                ...state,
            };
        case ActionTypes.MYPAGE_PUT_CARD_SUCCESS:
            return {
                ...state,
                reloadF: !state.reloadF,
                cardDetail: { ...state.cardDetail, descriptions: action.payload.descriptions },
            };
        case ActionTypes.MYPAGE_PUT_CARD_ERROR:
            return {
                ...state,
            };

        case ActionTypes.MY_PAGE_GET_LABEL_START:
            return {
                ...state,
                labelLoading: true,
            };
        case ActionTypes.MY_PAGE_GET_LABEL_SUCCESS:
            return {
                ...state,
                labels: action.payload,
                labelLoading: false,
                popupLabel: true,
            };
        case ActionTypes.MY_PAGE_GET_CARDLABEL_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    cardLabels: action.payload,
                },
            };
        case ActionTypes.MY_PAGE_GET_LABEL_ERROR:
            return {
                ...state,
                labelLoading: false,
            };

        case ActionTypes.MYPAGE_ADD_CARD_LABEL_SUCCESS:
            state.cardDetail.cardLabels.push({
                id: action.payload.id,
                labelId: action.payload.labelId,
                cardId: action.payload.cardId,
                labelName: state.labels.find((item: any) => item.id === action.payload.labelId)?.labelName,
                color: state.labels.find((item: any) => item.id === action.payload.labelId)?.color,
            });
            return {
                ...state,
                reloadF: !state.reloadF,
            };
        case ActionTypes.MYPAGE_DELETE_CARD_LABEL_SUCCESS: {
            const newCardLabels = state.cardDetail.cardLabels?.filter((item:any) => item.id !== action.payload);
            return {
                ...state,
                reloadF: !state.reloadF,
                cardDetail: {
                    ...state.cardDetail,
                    cardLabels: newCardLabels,
                },
            };
        }
        case ActionTypes.MYPAGE_ADD_NEW_LABEL_SUCCESS:
            state.labels.push(action.payload);
            return {
                ...state,
                reloadF: !state.reloadF,
            };

        case ActionTypes.MYPAGE_DELETE_COMMENT_SUCCESS: {
            const newComment = state.cardDetail.cardComments.filter((item:any) => item.cardCommentId !== action.payload);
            return {
                ...state,
                reloadF: !state.reloadF,
                cardDetail: {
                    ...state.cardDetail,
                    cardComments: newComment,
                },
            };
        }

        case ActionTypes.MYPAGE_EDIT_COMMENT_SUCCESS:
            {
                const newComment = state.cardDetail.cardComments.map((item:any) => (item.cardCommentId === action.payload.id ? {
                    cardCommentId: action.payload.id,
                    detail: action.payload.detail,
                    employeeId: action.payload.employeeId,
                    createDate: action.payload.createDate,
                    updateDate: '',
                } : item));
                return {
                    ...state,
                    reloadF: !state.reloadF,
                    cardDetail: {
                        ...state.cardDetail,
                        cardComments: newComment,
                    },
                };
            }

        case ActionTypes.MYPAGE_GET_LIST_MEMBERS_SUCCESS:
            return {
                ...state,
                cardMemberDatas: action.payload.items,
            };

        case ActionTypes.MYPAGE_ADD_CARD_MEMBER_SUCCESS: {
            const temp = {
                employeeId: action.payload.id,
                employeeName: state.cardMemberDatas
                    .find((item:any) => item.id === action.payload.employeeId)?.employeeName || '',
                color: state.cardMemberDatas
                    .find((item:any) => item.id === action.payload.employeeId)?.color || '#c9c9c9',
            };
            return {
                ...state,
                reloadF: !state.reloadF,
                cardDetail: { ...state.cardDetail, cardMembers: [...state.cardDetail.cardMembers, temp] },
            };
        }
        case ActionTypes.MYPAGE_DELETE_CARD_MEMBER_SUCCESS: {
            const newMembers = state.cardDetail
                .cardMembers?.filter((item:CardMember) => item.employeeId !== action.payload);
            return {
                ...state,
                reloadF: !state.reloadF,
                cardDetail: { ...state.cardDetail, cardMembers: newMembers },
            };
        }
        default:
            return state;
    }
}
export default MypgaeReducer;
