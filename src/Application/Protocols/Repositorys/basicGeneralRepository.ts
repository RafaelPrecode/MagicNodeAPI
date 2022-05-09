import { DefaultEntity } from "../../../Domain/Entities/defaultEntity";
import { EntityRepositoryInterface } from "./entityRepositoryInterface";
import { GeneralRepositoryInterface } from "./generalRepositoryInterface";

export abstract class BasicGeneralRepository implements EntityRepositoryInterface
{
    public getAllDataOfThisType(repository: GeneralRepositoryInterface): DefaultEntity[] {
        return this.buildEntityArray(repository.getDataInAcess(this.getDataAcessValue()))
    }

    getIdToNewEntity(repository: GeneralRepositoryInterface, params: object): number {
        var allData: DefaultEntity[] = this.getAllDataOfThisType(repository);
        var higherIndex: number = getHigherIndexFromDefaultEntityArray(allData);
        return higherIndex+1;
    }


    abstract buildEntityArray(data: object[]): DefaultEntity[];
    abstract getDataAcessValue(): object;

}


function getHigherIndexFromDefaultEntityArray(allData: DefaultEntity[]): number{
    return allData.map(entity=>entity.getId()).sort((a,b)=>b-a)[0];
}
