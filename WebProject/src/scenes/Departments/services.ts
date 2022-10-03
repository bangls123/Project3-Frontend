import http from '../../services/httpService';
import { DepartmentsFilter } from './dtos/departmentsFilter';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { DepartmentsData } from './dtos/departmentsData';
import AppConsts from '../../lib/appconst';
import utils from '../../utils/utils';
import EntityDto from '../../services/dto/entityDto';
import { ReportResultDto } from '../../services/dto/reportResultDto';
import { CreateDepartmentDto } from './dtos/createDepartmentDto';

class DepartmentService {
    static async download(): Promise<ReportResultDto> {
        const rs = await http.get('/department/file');
        if (rs) {
            const lstFile = rs.data.result.fileName.split(';');
            lstFile.forEach((element: string) => {
                window.open(`${AppConsts.remoteServiceBaseUrl?.replace('/api', '')}/Out/${element}`, '_blank');
            });
            return rs.data.result;
        }
        return rs;
    }

    static async getDepartmentList(input: DepartmentsFilter): Promise<PagedResultDto<DepartmentsData>> {
        const rs = await http.get('/department', { params: utils.makeGetRequestObject(input) });
        if (rs) {
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
            url: '/department/file',
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
                    window.open(`${AppConsts.remoteServiceBaseUrl?.replace('/api', '')}/Out/${rs.data.result.fileName}`, '_blank');
                }, 3000);
            }
            return rs.data.result;
        }
        return rs;
    }

    static async delete(input: EntityDto) {
        const rs = await http.delete(`/department/${input}`);
        if (rs) {
          return rs.data.result;
        }
        return rs;
    }

    static async getDetail(input: EntityDto): Promise<DepartmentsData> {
        const rs = await http.get(`/department/${input}`);
        if (rs) {
          return rs.data.result;
        }
        return rs;
    }

    static async createDepartment(input: CreateDepartmentDto) {
        const rs = await http.post('/department', input);
        if (rs) {
          return rs.data.result;
        }
        return rs;
    }

    static async updateDepartment(input: DepartmentsData) {
        const rs = await http.put('/department', input);
        if (rs) {
          return rs.data.result;
        }
        return rs;
    }
}

export default DepartmentService;
