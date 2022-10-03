import { CardLabels } from './cardLabels';
import { CardMember } from './cardMember';

export interface CardData {
    id: number,
    cardTitle: string,
    orderNo: number,
    cardMembers?: CardMember[],
    cardLabels?: CardLabels[]
}
