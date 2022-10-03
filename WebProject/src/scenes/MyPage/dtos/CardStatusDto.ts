import { CardDto } from './cardDto';

export interface CardStatusDto{
    id: number;
    cardStatusTitle: string;
    orderNo: number;
    cards: CardDto[];
}
