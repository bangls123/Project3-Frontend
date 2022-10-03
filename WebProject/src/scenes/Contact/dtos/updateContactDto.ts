export interface UpdateContactDto {
    id: number;
    organizationId: number;
    lastName: string;
    firstName: string;
    middleName: string;
    loginName: string;
    loginPassword: string;
    email: string;
    phone: string;
    phoneSecurity: string;
    tittle: string;
    description: string;
    createdDate: string;
    changeBy: string;
    changeDate: string;
    isActive: boolean;

}
