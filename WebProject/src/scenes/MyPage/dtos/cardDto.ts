import { CardCommentDto } from './CardComment';
import { CardLabels } from './cardLabels';
import { CardMember } from './cardMember';

export interface CardDto{
    id: number,
    cardStatusId: number,
    cardStatusTitle: string,
    cardTitle: string,
    descriptions: string,
    orderNo: number,
    cardMembers: CardMember[],
    cardLabels: CardLabels[],
    cardComments: CardCommentDto[]
}
