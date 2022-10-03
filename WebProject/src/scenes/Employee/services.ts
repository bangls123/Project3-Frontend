import AppConsts from '../../lib/appconst';
import EntityDto from '../../services/dto/entityDto';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { ReportResultDto } from '../../services/dto/reportResultDto';
import http from '../../services/httpService';
import utils from '../../utils/utils';
import { CreateEmployee } from './dtos/createEmployee';
import { DepartmentResult } from './dtos/departmentResult';
import { DetailEmployee } from './dtos/detailEmployee';
import { EmployeeFilterDto } from './dtos/employeeFilterDto';
import { EmployeeResult } from './dtos/employeeResult';
import { UpdateEmployee } from './dtos/updateEmployee';

class EmployServices {
    static async getAll(input: EmployeeFilterDto): Promise<PagedResultDto<EmployeeResult>> {
        const rs = await http.get('/employee', { params: utils.makeGetRequestObject(input) });
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async getAllDepartment(input: EmployeeFilterDto): Promise<PagedResultDto<DepartmentResult>> {
        const rs = await http.get('/department', { params: utils.makeGetRequestObject(input) });
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async getDetail(id: EntityDto): Promise<DetailEmployee> {
        const rs = await http.get(`/employee/${id}`);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async create(input: CreateEmployee) {
        const rs = await http.post('/employee', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async update(input: UpdateEmployee) {
        const rs = await http.put('/employee', input);
        if (rs) {
            return rs.data.result;
        }
        return rs;
    }

    static async download(): Promise<ReportResultDto> {
        const rs = await http.get('/employee/file');
        if (rs) {
            const lstFile = rs.data.result.fileName.split(';');
            lstFile.forEach((element: string) => {
                window.open(`${AppConsts.remoteServiceBaseUrl?.replace('/api', '')}/Out/${element}`, '_blank');
            });
            return rs.data.result;
        }
        return rs;
    }

    static async delete(id: number) {
        const rs = await http.delete(`/employee/${id}`);
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
            url: '/employee/file',
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
                });
            }
            return rs.data.result;
        }
        return rs;
    }
}

export default EmployServices;
