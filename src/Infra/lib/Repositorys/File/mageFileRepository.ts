import { MageRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { MagicRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { StyleRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MageEntity } from "../../../../Domain/Entities/mageEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import MagicUsecases from "../../../../Domain/Usecases/magicUsecases";
import { BasicFileEntityRepository } from "./basicFileEntityRepository";

export class MageFileRepository extends BasicFileEntityRepository implements MageRepositoryInterface
{
    buildEntity(data: object): DefaultEntity {
        return new MageEntity(data["id"], data["name"], data["level"],data["magicsIds"]);
    }

    async fetchMagicsFromMage(repository: GeneralRepositoryInterface, magicRepository: MagicRepositoryInterface, id: number): Promise<MagicEntity[]> {
        var allMagics = await magicRepository.getAllEntitysOfThisType(repository) as MagicEntity[];
        var selectedMage: MageEntity = await this.getSomeEntityById(repository, id) as MageEntity;

        if(!selectedMage) return;
        var magicsFromMage: number[] = selectedMage.getMagicsIds();

        return allMagics.filter(magic=>magicsFromMage.includes(magic.getId()));
    }

    async fetchStylesFromMage(repository: GeneralRepositoryInterface, magicRepository: MagicRepositoryInterface, styleRepository: StyleRepositoryInterface, id: number):  Promise<MagicStyleEntity[]> {
        var mageMagics = await this.fetchMagicsFromMage(repository, magicRepository, id);
        if (!mageMagics) return [];
        mageMagics = await styleRepository.injectStylesInMagics(repository, mageMagics);
        var allStyles = mageMagics.map(m=>m.getStylesObject());
        return combineAsOneObject(allStyles);
    }
 

    getBasicDataAcessValue(): object {
        return {'name': "mages"};
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