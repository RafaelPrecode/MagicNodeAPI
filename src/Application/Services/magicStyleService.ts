import { MagicEntity } from "../../Domain/Entities/magicEntity";
import { MagicStyleEntity } from "../../Domain/Entities/magicStyleEntity";
import { DefaultService } from "./defaultService";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";
import MagicStyleUsecases from "../../Domain/Usecases/magicStyleUsecases";

export class MagicStyleService extends DefaultService implements MagicStyleUsecases
{
    constructor(dataEntityRepository: EntityRepositoryInterface, dataRepository: GeneralRepositoryInterface){
        super(dataEntityRepository, dataRepository);
    }

    public insertStylesInMagic(magics: MagicEntity[]): MagicEntity[] {
        var magicResponse: MagicEntity[] = [];
        
        for(let i=0;i<magics.length;i++){
            magics[i].setStylesObject(this.fetchAllStyleNames(magics[i]));
            magics[i].deleteStyleIds();
            magicResponse.push(magics[i]);
        }
    
        return magicResponse;
    }

    fetchAllStyleNames(magic: MagicEntity): MagicStyleEntity[]{
        var allStyles = this.getAll();
        var stylesFromMagic = allStyles.filter(style=>
            magic.getStyleIds().includes(style.getId())
        );

        return stylesFromMagic;
    }
}


