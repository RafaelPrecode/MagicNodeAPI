
export interface GeneralRepositoryInterface
{
    getAllData(): object[];
    getDataInAcess(dataAcessValue: object): object[];
    setDataInAcess(acess: object, data: object): void;
}

