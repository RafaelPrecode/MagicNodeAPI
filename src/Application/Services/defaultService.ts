import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import { AlterationData } from "../../Utils/alterationData";
import DefaultUsecases from "../../Domain/Usecases/defaultUsecases";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";


export class DefaultService implements DefaultUsecases
{
    protected dataEntityRepository: EntityRepositoryInterface
    protected dataRepository: GeneralRepositoryInterface;

    constructor(dataEntityRepository: EntityRepositoryInterface, dataRepository: GeneralRepositoryInterface){
        this.dataEntityRepository = dataEntityRepository;
        this.dataRepository = dataRepository;
    }

    protected getAllData(): DefaultEntity[]{
        return this.dataEntityRepository.getAllDataOfThisType(this.dataRepository);
    }


    getAll(): DefaultEntity[] {
        return this.getAllData();
    }

    getById(id: number): DefaultEntity {
        return this.getAllData().filter(element=>element.getId()==id)[0];
    }

    create(entity: DefaultEntity): object {
        var data: DefaultEntity[] = this.getAllData();
        if(!entity.getId()) entity.setId(this.dataEntityRepository.getIdToNewEntity(this.dataRepository, null));
        if(idAlreadyExist(data, entity.getId())) return getBoolResponse(false);
        data.push(entity);
        this.dataRepository.setDataInAcess(this.dataEntityRepository.getDataAcessValue(), data);
        return getBoolResponse(true, {"entityId":entity.getId()});
    }

    delete(id: number): object {
        var data: DefaultEntity[] = this.getAllData();
        if(!idAlreadyExist(data, id)) return getBoolResponse(false);
        data = data.filter(entity=>entity['id']!=id);
        this.dataRepository.setDataInAcess(this.dataEntityRepository.getDataAcessValue(), data);
        return getBoolResponse(true);
    }

    update(entity: DefaultEntity): object {
        if(!this.delete(entity.getId())) return getBoolResponse(false);
        var data: DefaultEntity[] = this.getAllData();
        data.push(entity);
        this.dataRepository.setDataInAcess(this.dataEntityRepository.getDataAcessValue(), data);
        return getBoolResponse(true);
    }

    updateProperty(id: number, propertyAlteration: AlterationData): object {
        var customEntity: DefaultEntity = this.getById(id);
        if(!customEntity) return getBoolResponse(false);

        var property = customEntity[propertyAlteration.getName()];
        type propertyType = typeof property;

        customEntity[propertyAlteration.getName()] = (propertyAlteration.getData() as propertyType); //@

        return this.update(customEntity);
    }



}


function idAlreadyExist(data: any[], id: number): boolean{
    var alreadyExist = false;
    data.forEach(obj=>{
        if(obj['id']==id) alreadyExist=true;
    });

    return alreadyExist;
}


function getBoolResponse(value: boolean, extensionObject: object = null): object{
    var reponse = {"operationWasSuccessful": value};
    if(extensionObject)
        Object.assign(reponse, extensionObject);

    return reponse;
}