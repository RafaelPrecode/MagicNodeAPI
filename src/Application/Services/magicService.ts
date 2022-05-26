import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import { MagicEntity } from "../../Domain/Entities/magicEntity";
import { DefaultService } from "./defaultService";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";
import MagicUsecases from "../../Domain/Usecases/magicUsecases";
import { MagicRepositoryInterface } from "../Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { MageRepositoryInterface } from "../Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { StyleRepositoryInterface } from "../Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { ServiceUtil } from "./serviceUtil";

export class MagicService extends DefaultService implements MagicUsecases
{
    private magicRepository: MagicRepositoryInterface;
    private styleRepository: StyleRepositoryInterface;
    private mageRepository: MageRepositoryInterface

    constructor(dataEntityRepository: EntityRepositoryInterface, dataRepository: GeneralRepositoryInterface){
        super(dataEntityRepository, dataRepository);
        this.magicRepository = dataEntityRepository as MagicRepositoryInterface;
    }

    injectMageRepository(mageRepository: MageRepositoryInterface){
        this.mageRepository = mageRepository;
    }

    injectStyleRepository(styleRepository: StyleRepositoryInterface){
        this.styleRepository = styleRepository;
    }


    async getAllMagicFromStyle(styleId: number): Promise<object> {
        if(! await this.dataEntityRepository.idAlreadyExist(this.dataRepository, styleId))
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getIdDoNotExistErrorReponse());
        return await this.magicRepository.matchMagicsOfStyle(this.dataRepository, this.styleRepository, styleId);
    }

    
    async getUsersFromMagic(magicId: number): Promise<object> {
        if(! await this.dataEntityRepository.idAlreadyExist(this.dataRepository, magicId))
            return ServiceUtil.getBoolResponse(false, ServiceUtil.getIdDoNotExistErrorReponse());
        return await this.magicRepository.fetchMagesFromMagic(this.dataRepository, this.mageRepository, magicId);
    }


    async getAll(): Promise<DefaultEntity[]> {
        var magics: MagicEntity[] = await super.getAll() as MagicEntity[];
        return await this.styleRepository.injectStylesInMagics(this.dataRepository, magics);
    }


}