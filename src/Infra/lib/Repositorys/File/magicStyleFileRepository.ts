import { StyleRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import { BasicFileEntityRepository } from "./basicFileEntityRepository";


export class MagicStyleFileRepository extends BasicFileEntityRepository implements StyleRepositoryInterface
{
    buildEntity(data: object): DefaultEntity {
        return new MagicStyleEntity(data["id"], data["name"]);
    }

    async fetchMagicsFromStyle(): Promise<MagicEntity[]> { //@
        throw new Error("Method not implemented.");
    }

    async fetchMagesFromStyle(): Promise<MagicStyleEntity[]> { //@
        throw new Error("Method not implemented.");
    }

    async injectStylesInMagics(repository: GeneralRepositoryInterface, magics: MagicEntity[]): Promise<MagicEntity[]> {
        var magicResponse: MagicEntity[] = [];
        
        for(let i=0;i<magics.length;i++){
            magics[i].setStylesObject(await this.fetchAllStyleNames(repository, magics[i]));
            magics[i].deleteStyleIds();
            magicResponse.push(magics[i]);
        }
    
        return magicResponse;
    }

    private async fetchAllStyleNames(repository: GeneralRepositoryInterface, magic: MagicEntity): Promise<MagicStyleEntity[]>{
        var allStyles = await this.getAllEntitysOfThisType(repository);
        var stylesFromMagic = allStyles.filter(style=>
            magic.getStyleIds().includes(style.getId())
        );

        return stylesFromMagic as MagicStyleEntity[];
    }

    getBasicDataAcessValue(): object {
        return {'name': "styles"};
    }
}