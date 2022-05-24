import { DefaultEntity } from "../../../Domain/Entities/defaultEntity";

export interface GeneralRepositoryInterface
{
    getDataInAcess(dataAcessValue: object): Promise<object[]>;
    registryNewEntry(acess: object, data: DefaultEntity, id?: number): Promise<number>;
    deleteEntryById(acess: object, id: number): Promise<boolean>;
    updateAnEntry(acess: object, data: DefaultEntity): Promise<boolean>;
}

