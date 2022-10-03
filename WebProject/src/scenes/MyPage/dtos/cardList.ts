import { CardData } from './cardData';

export interface CardList {
    id:number,
    cardStatusTitle:string,
    orderNo: number,
    cards: CardData[]
}
