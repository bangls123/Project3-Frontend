import http from '../../services/httpService';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { ContactFilterDto } from './dtos/contactFilterDto';
import { ContactDto } from './dtos/contactDto';
import EntityDto from '../../services/dto/entityDto';
import { ReportResultDto } from '../../services/dto/reportResultDto';
import AppConsts from '../../lib/appconst';
import utils from '../../utils/utils';
import { UpdateContactDto } from './dtos/updateContactDto';
import { CreateContactDto } from './dtos/createContactDto';

class ContactService {
    static async getAll(input: ContactFilterDto): Promise<PagedResultDto<ContactDto>> {
        const rs = await http.get('/contact/getList', { params: utils.makeGetRequestObject(input) });
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async getDetail(input: EntityDto): Promise<ContactDto> {
        const rs = await http.get('/contact/getDetail', { params: input });
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async delete(input: EntityDto) {
        const rs = await http.delete('/contact/delete', { params: input });
        if (rs) {
          return rs.data.result;
        }
        return rs;
    }

    static async update(input: UpdateContactDto) {
        const rs = await http.put('/contact/update', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async create(input: CreateContactDto) {
        const rs = await http.post('/contact/create', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async download(): Promise<ReportResultDto> {
        const rs = await http.get('/contact/download');
        if (rs) {
            const lstFile = rs.data.result.fileName.split(';');
            lstFile.forEach((element: string) => {
                window.open(`${AppConsts.remoteServiceBaseUrl?.replace('/api/services/app', '')}/Out/${element}`, '_blank');
            });
            return rs.data.result;
        }
        return rs;
    }

    static async upload(input: File[]): Promise<ReportResultDto> {
        const formData = new FormData();
        input.forEach((file) => {
            formData.append('File', file);
        });
        const rs = await http.request({
            url: '/contact/upload',
            method: 'post',
            data: formData,
            headers: {
                cache: false,
                contentType: false,
                processData: false,
            },
        });
        if (rs) {
            if (rs.data.result.message && rs.data.result.message !== '') {
                setTimeout(() => {
                    window.open(`${AppConsts.remoteServiceBaseUrl?.replace('/api/services/app', '')}/Out/${rs.data.result.fileName}`, '_blank');
                }, 3000);
            }
            return rs.data.result;
        }
        return rs;
    }
}

export default ContactService;
