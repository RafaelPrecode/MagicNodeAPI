import { MageEntity } from "../../Domain/Entities/mageEntity";
import { MagicEntity } from "../../Domain/Entities/magicEntity";
import { MagicStyleEntity } from "../../Domain/Entities/magicStyleEntity";
import { DefaultService } from "./defaultService";
import { GeneralRepositoryInterface } from "../Protocols/Repositorys/generalRepositoryInterface";
import { EntityRepositoryInterface } from "../Protocols/Repositorys/entityRepositoryInterface";
import MageUsecases from "../../Domain/Usecases/mageUsecases";
import DefaultUsecases from "../../Domain/Usecases/defaultUsecases";
import MagicUsecases from "../../Domain/Usecases/magicUsecases";


export class MageService extends DefaultService implements MageUsecases
{
    private magicUsecases: DefaultUsecases

    constructor(dataEntityRepository: EntityRepositoryInterface, dataRepository: GeneralRepositoryInterface, magicService: DefaultUsecases){
        super(dataEntityRepository, dataRepository);
        this.magicUsecases = magicService;
    }

    injectMagicService(magicUsecases: MagicUsecases){
        this.magicUsecases = magicUsecases;
    }


    async getMagicsFromMage(id: number): Promise<MagicEntity[]> {
        var allMagics = await this.magicUsecases.getAll();
        var selectedMage: MageEntity = await this.getById(id) as MageEntity;
        if(!selectedMage) return;
        var magicsFromMage: number[] = selectedMage.getMagicsIds();

        return allMagics.filter(magic=>magicsFromMage.includes(magic.getId())) as MagicEntity[];
    }


    async getStylesOfMage(id: number): Promise<MagicStyleEntity[]> {
        var mageMagics = await this.getMagicsFromMage(id);
        if (!mageMagics) return [];

        var allStyles = mageMagics.map(m=>m.getStylesObject());
        return combineAsOneObject(allStyles);
    }
}


function combineAsOneObject(styles: MagicStyleEntity[][]): MagicStyleEntity[]{
    var final: MagicStyleEntity[] = [];
    
    styles.forEach(_style=>{
        final = final.concat(_style);
    });

    let ids = final.map(o => o.getId())
    final = final.filter((f, index) => !ids.includes(f.getId(), index + 1));
    final = final.sort((s1,s2)=>s1.getId()-s2.getId());
    return final;
}