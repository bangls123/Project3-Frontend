import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { ContactDto } from './dtos/contactDto';

export interface ContactState {
    // Effect loading for table
    readonly loading: boolean;
    // Option filter
    readonly keyword: string;
    readonly currentPage: number;
    readonly maxResultCount: number;
    // Data for table
    readonly datas: PagedResultDto<ContactDto>;
    // Reload flag
    readonly reloadF: boolean;
    // Effect loading for download
    readonly downloadLoading: boolean;
    // Effect loading for upload
    readonly uploadLoading: boolean;
    readonly uploadModalOpen: boolean;
    // Detail
    readonly detailFormOpen: boolean;
    readonly detailLoading: boolean;
    readonly contactId: number;
    readonly contactDetail: ContactDto;
    readonly saveLoading: boolean;
}

export type ContactActions = ActionType<typeof actions>;
