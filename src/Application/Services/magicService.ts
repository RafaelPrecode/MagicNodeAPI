import { MageEntity } from "../../Domain/Entities/mageEntity";
import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import { MagicEntity } from "../../Domain/Entities/magicEntity";
import { DefaultService } from "./defaultService";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";
import MagicUsecases from "../../Domain/Usecases/magicUsecases";
import MagicStyleUsecases from "../../Domain/Usecases/magicStyleUsecases";
import DefaultUsecases from "../../Domain/Usecases/defaultUsecases";
import MageUsecases from "../../Domain/Usecases/mageUsecases";

export class MagicService extends DefaultService implements MagicUsecases
{
    private mageUsecases: DefaultUsecases
    private magicStyleUsecases: MagicStyleUsecases;

    constructor(dataEntityRepository: EntityRepositoryInterface, dataRepository: GeneralRepositoryInterface,
        magicStyleUsecases: MagicStyleUsecases){
        super(dataEntityRepository, dataRepository);
        this.magicStyleUsecases = magicStyleUsecases;
    }

    injectMageService(mageUsecases: MageUsecases){
        this.mageUsecases = mageUsecases;
    }


    async getAllMagicFromStyle(styleId: number): Promise<MagicEntity[]> {
        var allMagics: MagicEntity[] = await this.getAll() as MagicEntity[];
        return allMagics.filter(magic=>
            magic.getStylesObject().map(s=>s.getId()).includes(styleId)
        );
    }

    
    async getUsersFromMagic(magicId: number): Promise<MageEntity[]> {
        var allMages: MageEntity[] = await this.mageUsecases.getAll() as MageEntity[];
        return allMages.filter(mage=>mage.getMagicsIds().includes(magicId)); 
    }


    async getAll(): Promise<DefaultEntity[]> {
        var magics: MagicEntity[] = await super.getAll() as MagicEntity[];
        return await this.magicStyleUsecases.insertStylesInMagic(magics);
    }


}