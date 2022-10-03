import ActionTypes from './constants';
import { CardDetailDto } from './dtos/cardDetailDto';
import { KanbanActions, KanbanState } from './type';

export const initialState: KanbanState = {
    addListButtonFlag: false,
    reloadF: false,
    datas: [
        {
            title: 'TO DO',
            id: 0,
            cards: [
                {
                    taskText: 'default task card 1',
                    listNumber: 0,
                    timeId: 0,
                },
                {
                    taskText: 'default task card 2',
                    listNumber: 0,
                    timeId: 1,
                },
            ],
        },
        {
            title: 'IN PROGRESS',
            id: 1,
            cards: [
                {
                    taskText: 'default task card 1',
                    listNumber: 1,
                    timeId: 2,
                },
                {
                    taskText: 'default task card 2',
                    listNumber: 1,
                    timeId: 3,
                },
            ],
        },
        {
            title: 'QA',
            id: 2,
            cards: [
                {
                    taskText: 'default task card 1',
                    listNumber: 2,
                    timeId: 4,
                },
                {
                    taskText: 'default task card 2',
                    listNumber: 2,
                    timeId: 5,
                },
            ],
        },
        {
            title: 'DONE',
            id: 3,
            cards: [
                {
                    taskText: 'default task card 1',
                    listNumber: 3,
                    timeId: 6,
                },
                {
                    taskText: 'default task card 2',
                    listNumber: 3,
                    timeId: 7,
                },
            ],
        },
        {
            title: 'TO DO25',
            id: 4,
            cards: [
                {
                    taskText: 'default task card 1',
                    listNumber: 4,
                    timeId: 8,
                },
                {
                    taskText: 'default task card 2',
                    listNumber: 4,
                    timeId: 9,
                },
            ],
        },
    ],
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
    ],
    colorChecked: '#70ad47',
    labels: [
        {
            id: 0,
            label: 'Task',
            color: '#70ad47',
        },
        {
            id: 1,
            label: 'Bug',
            color: '#ffbf00',
        },
        {
            id: 2,
            label: 'Feature',
            color: '#c55911',
        },
    ],
    labelChecked: 'Task',
    boardMembers: [
        {
            id: 0,
            avatar: 'H',
            name: 'Hoàng Xuân Vũ',
            shortentName: 'vuhx',
            color: '#70ad47',
        },
        {
            id: 1,
            avatar: 'D',
            name: 'Nguyễn Bá Đức',
            shortentName: 'ducnb',
            color: '#ffbf00',
        },
        {
            id: 2,
            avatar: 'K',
            name: 'Đào Trọng Khang',
            shortentName: 'khangdt',
            color: '#5b9bd5',
        },
    ],
    checkedMember: 'vuhx',
    dragInfo: null,
    cardDetailPopup: false,
    cardDetail: {} as CardDetailDto,
    popupMember: false,
    popupLabel: false,
};

const kanbanReducer = (state: KanbanState = initialState, action: KanbanActions) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_ADDLIST_BUTTON:
            return {
                ...state,
                addListButtonFlag: !state.addListButtonFlag,
            };
        case ActionTypes.KANBAN_DRAP_CARD_START:
            return {
                ...state,
                dragInfo: action.payload,
            };
        case ActionTypes.KANBAN_DRAP_CARD_END:
            return {
                ...state,
                reloadF: !state.reloadF,
                datas: action.payload,
            };
        case ActionTypes.KANBAN_SELECT_COLOR:
            return {
                ...state,
                colorChecked: action.payload,
            };
        case ActionTypes.KANBAN_SELECT_LABEL:
            return {
                ...state,
                labelChecked: action.payload,
            };
        case ActionTypes.KANBAN_SELECT_MEMBER:
            return {
                ...state,
                checkedMember: action.payload,
            };
        case ActionTypes.TOGGLE_POPUP_CARD_DETAIL:
            return {
                ...state,
                cardDetailPopup: !state.cardDetailPopup,
                cardDetail: action.payload,
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
        default:
            return state;
        }
};

export default kanbanReducer;
