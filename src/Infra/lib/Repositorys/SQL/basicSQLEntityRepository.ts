import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { BasicEntityRepository } from "../../../../Application/Protocols/Repositorys/basicEntityRepository";
import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";

export abstract class BasicSQLEntityRepository extends BasicEntityRepository
{
    async getAllData(repository: GeneralRepositoryInterface): Promise<object[]> {
        var acess = this.getBasicDataAcessValue();
        acess['extra'] = '';
        return await repository.getDataInAcess(acess);
    }

    async getSomeDataById(repository: GeneralRepositoryInterface, id: number): Promise<object> {
        var acess = this.getBasicDataAcessValue();
        acess['extra'] = `WHERE id=${id}`
        var response = await repository.getDataInAcess(acess);
        return (response.length!=0) ? response : null;
    }

    async updateAnEntity(repository: GeneralRepositoryInterface, entity: DefaultEntity): Promise<boolean>{
        return await repository.updateAnEntry(this.getUpdateDataAcessValue(entity), entity);
    }

    
    async idAlreadyExist(repo: GeneralRepositoryInterface, id: number): Promise<boolean>{
        if(!id) return false;
        return !!(await this.getSomeDataById(repo, id));
    }

    abstract getBasicDataAcessValue(): object;
    abstract getUpdateDataAcessValue(entity: DefaultEntity): object;
    abstract buildEntity(data: object): DefaultEntity;

}

