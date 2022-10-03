import { ActionType } from 'typesafe-actions';
import { CardLabels } from './dtos/cardLabels';
import { CardMemberData } from './dtos/CardMemberData';
import { CardDto } from './dtos/cardDto';
import * as actions from './actions';
import { CardList } from './dtos/cardList';
import { ColorDtos } from './dtos/color';

export interface MypageState {
    readonly reloadF: boolean,
    readonly datas: CardList[],
    readonly dragInfo: any,
    readonly colors: ColorDtos[],
    colorChecked: string,
    // open popup card detail
    readonly cardDetailPopup: boolean,
    readonly cardDetail: CardDto,
    readonly popupMember: boolean,
    readonly popupLabel: boolean,
    // loading
    readonly loading: boolean,
    readonly getCardCompleted: boolean,
    readonly cardMemberDatas: CardMemberData[],
    readonly labelLoading: boolean,
    readonly labels: CardLabels[]
}

export type MypageActions = ActionType<typeof actions>;
