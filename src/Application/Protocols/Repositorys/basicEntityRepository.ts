import { DefaultEntity } from "../../../Domain/Entities/defaultEntity";
import { EntityRepositoryInterface } from "./entityRepositoryInterface";
import { GeneralRepositoryInterface } from "./generalRepositoryInterface";

export abstract class BasicEntityRepository implements EntityRepositoryInterface
{
    async getAllEntitysOfThisType(repository: GeneralRepositoryInterface): Promise<DefaultEntity[]> {
        return this.buildEntityArray(await this.getAllData(repository));
    }

    async getSomeEntityById(repository: GeneralRepositoryInterface, id: number): Promise<DefaultEntity> {
        return this.buildEntityFromData((await this.getSomeDataById(repository, id)));        
    }

    async addNewEntity(repository: GeneralRepositoryInterface, entity: DefaultEntity): Promise<number>{
        return await repository.registryNewEntry(this.getBasicDataAcessValue(), entity, entity.getId());
    }

    async deleteAnEntity(repository: GeneralRepositoryInterface, id: number): Promise<boolean> {
        return await repository.deleteEntryById(this.getBasicDataAcessValue(), id);
    }

    async updateAnEntity(repository: GeneralRepositoryInterface, entity: DefaultEntity): Promise<boolean>{
        return await repository.updateAnEntry(this.getBasicDataAcessValue(), entity);
    }


    buildEntityArray(dataArray: object[]): DefaultEntity[] {
        if (!dataArray) return null;
        var buildedEntity: DefaultEntity[] = [];

        dataArray.forEach(data=>{
            buildedEntity.push(this.buildEntityFromData(data));
        });

        return buildedEntity;
    }

    buildEntityFromData(data: object): DefaultEntity{
        return (data)?this.buildEntity(data):null;
    }


    abstract getAllData(repository: GeneralRepositoryInterface): Promise<object[]>;
    abstract getSomeDataById(repository: GeneralRepositoryInterface, id: number): Promise<object>;
    
    abstract getBasicDataAcessValue(): object;
    abstract idAlreadyExist(repo:GeneralRepositoryInterface ,id: number): Promise<boolean>;

    abstract buildEntity(data: object): DefaultEntity;
}
