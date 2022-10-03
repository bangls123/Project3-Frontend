import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { BoardMembers } from './dtos/boardMembersDto';
import { CardDetailDto } from './dtos/cardDetailDto';
import { CardListDto } from './dtos/cardListDto';
import { ColorsDto } from './dtos/colorsDto';
import { LabelsDto } from './dtos/labelsDto';

export interface KanbanState {
    // change add list button model
    readonly addListButtonFlag: boolean;
    readonly reloadF: boolean;
    readonly datas: CardListDto[];
    readonly dragInfo: any;
    readonly colors: ColorsDto[];
    readonly colorChecked: string;
    readonly labels: LabelsDto[];
    readonly labelChecked: string;
    readonly boardMembers: BoardMembers[];
    readonly checkedMember: string;
    // open popup card detail
    readonly cardDetailPopup: boolean;
    readonly cardDetail: CardDetailDto;
    readonly popupMember: boolean;
    readonly popupLabel: boolean;
}

export type KanbanActions = ActionType<typeof actions>;
