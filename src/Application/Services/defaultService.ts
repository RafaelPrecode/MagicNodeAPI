import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import { AlterationData } from "../../Domain/Utils/alterationData";
import DefaultUsecases from "../../Domain/Usecases/defaultUsecases";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";


export class DefaultService implements DefaultUsecases
{
    protected dataEntityRepository: EntityRepositoryInterface;
    protected dataRepository: GeneralRepositoryInterface;

    constructor(dataEntityRepository: EntityRepositoryInterface, dataRepository: GeneralRepositoryInterface){
        this.dataEntityRepository = dataEntityRepository;
        this.dataRepository = dataRepository;
    }

    async getAll(): Promise<DefaultEntity[]>{
        return await this.dataEntityRepository.getAllEntitysOfThisType(this.dataRepository);
    }

    async getById(id: number): Promise<DefaultEntity> {
        return await this.dataEntityRepository.getSomeEntityById(this.dataRepository, id);
    }

    async create(entity: DefaultEntity): Promise<object> {
        if(await this.dataEntityRepository.idAlreadyExist(this.dataRepository, entity.getId())) return getBoolResponse(false, {"errorType":'ID already exists'});

        var entityId = await this.dataEntityRepository.addNewEntity(this.dataRepository, entity);
        if(entityId){
            return getBoolResponse(true, {"entityId":entityId});
        }else{
            return getBoolResponse(false);
        }
    }

    async delete(id: number): Promise<object> {
        if(! await this.dataEntityRepository.idAlreadyExist(this.dataRepository, id)) return getBoolResponse(false, {"errorType":'ID do not exists'});

        if (await this.dataEntityRepository.deleteAnEntity(this.dataRepository, id)){
            return getBoolResponse(true);
        }else{
            return getBoolResponse(false, {"errorType": "Persistence Issue..."})
        }
    }

    async update(entity: DefaultEntity): Promise<object> {   //@ to aqui no desacoplamento da default service!
        if(! await this.dataEntityRepository.idAlreadyExist(this.dataRepository, entity.getId())) return getBoolResponse(false, {"errorType":'ID do not exists'});

        if (await this.dataEntityRepository.updateAnEntity(this.dataRepository, entity)){
            return getBoolResponse(true);
        }else{
            return getBoolResponse(false, {"errorType": "Persistence Issue..."})
        }
    }

    async updateProperty(id: number, propertyAlteration: AlterationData): Promise<object> { //@
        /*
        var customEntity: DefaultEntity = await this.getById(id);
        if(!customEntity) return getBoolResponse(false);

        var property = customEntity[propertyAlteration.getName()];
        type propertyType = typeof property;

        customEntity[propertyAlteration.getName()] = (propertyAlteration.getData() as propertyType);

        return this.update(customEntity);
        */
        return getBoolResponse(false, {"errorType": "Not implemeted..."});
    }



}




function getBoolResponse(value: boolean, extensionObject: object = null): object{
    var reponse = {"operationWasSuccessful": value};
    if(extensionObject)
        Object.assign(reponse, extensionObject);

    return reponse;
}