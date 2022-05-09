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


    getAllMagicFromStyle(styleId: number): MagicEntity[] {
        var allMagics: MagicEntity[] = this.getAll() as MagicEntity[];
        return allMagics.filter(magic=>
            magic.getStylesObject().map(s=>s.getId()).includes(styleId)
        );
    }

    
    getUsersFromMagic(magicId: number): MageEntity[] {
        var allMages: MageEntity[] = this.mageUsecases.getAll() as MageEntity[];
        return allMages.filter(mage=>mage.getMagicsIds().includes(magicId)); 
    }


    getAll(): DefaultEntity[] {
        var magics: MagicEntity[] = this.getAllData() as MagicEntity[];
        var magicResponse: DefaultEntity[] = this.magicStyleUsecases.insertStylesInMagic(magics);
        return magicResponse;
    }


}