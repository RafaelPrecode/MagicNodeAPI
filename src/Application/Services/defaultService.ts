import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import { AlterationData } from "../../Domain/Utils/alterationData";
import DefaultUsecases from "../../Domain/Usecases/defaultUsecases";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";
import { ServiceUtil } from "./serviceUtil";


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
        if(await this.dataEntityRepository.idAlreadyExist(this.dataRepository, entity.getId()))
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getIdDoesExistErrorReponse());

        var entityId = await this.dataEntityRepository.addNewEntity(this.dataRepository, entity);
        if(entityId){
            return ServiceUtil.getBoolResponse(true, {"entityId":entityId});
        }else{
            return ServiceUtil.getBoolResponse(false);
        }
    }

    async delete(id: number): Promise<object> {
        if(! await this.dataEntityRepository.idAlreadyExist(this.dataRepository, id))
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getIdDoNotExistErrorReponse());

        if (await this.dataEntityRepository.deleteAnEntity(this.dataRepository, id)){
            return ServiceUtil.getBoolResponse(true);
        }else{
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getPersistenceErrorReponse())
        }
    }

    async update(entity: DefaultEntity): Promise<object> {
        if(! await this.dataEntityRepository.idAlreadyExist(this.dataRepository, entity.getId()))
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getIdDoNotExistErrorReponse());

        if (await this.dataEntityRepository.updateAnEntity(this.dataRepository, entity)){
            return ServiceUtil.getBoolResponse(true);
        }else{
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getPersistenceErrorReponse())
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
        return ServiceUtil.getBoolResponse(false, {"errorType": "Not implemeted..."});
    }



}

