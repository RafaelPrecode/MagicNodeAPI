import { DefaultEntity } from "../../../Domain/Entities/defaultEntity";
import { GeneralRepositoryInterface } from "./generalRepositoryInterface";

export interface EntityRepositoryInterface{
    buildEntityArray(data: object[]): DefaultEntity[];
    getAllDataOfThisType(repository: GeneralRepositoryInterface): DefaultEntity[];
    getDataAcessValue(): object;
    getIdToNewEntity(repository: GeneralRepositoryInterface, params: object): number;
}