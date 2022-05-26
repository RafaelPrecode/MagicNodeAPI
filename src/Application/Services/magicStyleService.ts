import { DefaultService } from "./defaultService";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";
import MagicStyleUsecases from "../../Domain/Usecases/magicStyleUsecases";
import { StyleRepositoryInterface } from "../Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";

export class MagicStyleService extends DefaultService implements MagicStyleUsecases
{
    styleRepository: StyleRepositoryInterface;

    constructor(dataEntityRepository: EntityRepositoryInterface, dataRepository: GeneralRepositoryInterface){
        super(dataEntityRepository, dataRepository);
        this.styleRepository = dataEntityRepository as StyleRepositoryInterface;
    }
}


