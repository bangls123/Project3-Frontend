import { InputCommentDto } from './dtos/EditComments';
import { CardMemberData } from './dtos/CardMemberData';
import { CardDto } from './dtos/cardDto';
import { CardInputDto } from './dtos/CardInputDto';
import { CardList } from './dtos/cardList';
import EntityDto from '../../services/dto/entityDto';
import http from '../../services/httpService';
import { AddComments } from './dtos/AddComments';
import { AddCardLabel } from './dtos/AddCardLabel';
import utils from '../../utils/utils';

class MyPageServices {
    static async getCardStatus(employeeId: EntityDto): Promise<CardList[]> {
        const rs = await http.get(`/cardStatus/${employeeId}`);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async update(input: CardInputDto) {
        const rs = await http.put('/card', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async getCard(id: number): Promise<CardDto> {
        const rs = await http.get(`/card/${id}`);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async createComments(input: AddComments) {
        const rs = await http.post('/cardComment', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async getCardMember(input: EntityDto): Promise<CardMemberData[]> {
        const rs = await http.get(`/cardMember/?cardId=${input}`);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async getCardLabel(input?: number) {
        const rs = await http.get(`/cardLabel/${input}`);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async getCardLabels(input?: string) {
        const rs = await http.get(`/label/${input && `?keyword=${input}`}`);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async addCardLabels(input: AddCardLabel) {
        const rs = await http.post('/cardLabel', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async deleteCardLabels(input: number) {
        const rs = await http.delete(`/cardLabel/${input}`);
        if (rs) {
            return input;
        }
        return rs;
    }

    static async addNewLabels(input: AddCardLabel) {
        const rs = await http.post('/label', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async deleteComment(input: number) {
        const rs = await http.delete(`/cardComment/${input}`);
        if (rs) {
            return input;
        }
        return rs;
    }

    static async editComment(input: InputCommentDto) {
        const rs = await http.put('/cardComment', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async addCardMembers(input: any) {
        const rs = await http.post('/cardMember', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async getListMember(input: any) {
        const rs = await http.get('/employee', { params: utils.makeGetRequestObject(input) });
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async deleteCardMember(input: any) {
        const rs = await http.delete(`/cardMember/${input}`);
        if (rs) {
            return input;
        }
        return rs;
    }

    static async moveCard(input: CardInputDto) {
        const rs = await http.put('/card', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }
}

export default MyPageServices;
