import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { BasicEntityRepository } from "../../../../Application/Protocols/Repositorys/basicEntityRepository";
import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";

export abstract class BasicFileEntityRepository extends BasicEntityRepository
{
    async getAllData(repository: GeneralRepositoryInterface): Promise<object[]> {
        return await repository.getDataInAcess(this.getBasicDataAcessValue());
    }
    
    async getSomeDataById(repository: GeneralRepositoryInterface, id: number): Promise<object> {
        return (await this.getAllData(repository)).filter(obj=>obj['id']==id)[0];
    }

    async idAlreadyExist(repo: GeneralRepositoryInterface, id: number): Promise<boolean>{
        var allEntitys: DefaultEntity[] = await this.getAllEntitysOfThisType(repo);
        return allEntitys.some(entity=>entity.getId()==id);
    }


    abstract getBasicDataAcessValue(): object;
    abstract buildEntity(data: object): DefaultEntity;
}
