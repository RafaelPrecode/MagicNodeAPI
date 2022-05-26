import { DefaultService } from "./defaultService";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";
import MageUsecases from "../../Domain/Usecases/mageUsecases";
import { MageRepositoryInterface } from "../Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { MagicRepositoryInterface } from "../Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { StyleRepositoryInterface } from "../Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { ServiceUtil } from "./serviceUtil";


export class MageService extends DefaultService implements MageUsecases
{
    private magicRepository: MagicRepositoryInterface;
    private mageRepository: MageRepositoryInterface;
    private styleRepository: StyleRepositoryInterface;

    constructor(dataEntityRepository: EntityRepositoryInterface, dataRepository: GeneralRepositoryInterface){
        super(dataEntityRepository, dataRepository);
        this.mageRepository = dataEntityRepository as MageRepositoryInterface;
    }

    injectMagicRepository(magicRepository: MagicRepositoryInterface){
        this.magicRepository = magicRepository;
    }

    injectStyleRepository(styleRepository: StyleRepositoryInterface){
        this.styleRepository = styleRepository;
    }


    async getMagicsFromMage(id: number): Promise<object> {
        if(! await this.dataEntityRepository.idAlreadyExist(this.dataRepository, id))
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getIdDoNotExistErrorReponse());

        return await this.mageRepository.fetchMagicsFromMage(this.dataRepository, this.magicRepository, id);
    }


    async getStylesOfMage(id: number): Promise<object> {
        if(! await this.dataEntityRepository.idAlreadyExist(this.dataRepository, id))
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getIdDoNotExistErrorReponse());

        return await this.mageRepository.fetchStylesFromMage(this.dataRepository, this.magicRepository, this.styleRepository, id);
    }
}

