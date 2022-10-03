import { CardDetailDto } from './cardDetailDto';

export interface CardListDto {
    id: number;
    title: string;
    cards: CardDetailDto[];
}
