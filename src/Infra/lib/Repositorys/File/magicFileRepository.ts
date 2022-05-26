import { MageRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { MagicRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { StyleRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MageEntity } from "../../../../Domain/Entities/mageEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import MageUsecases from "../../../../Domain/Usecases/mageUsecases";
import { BasicFileEntityRepository } from "./basicFileEntityRepository";

export class MagicFileRepository extends BasicFileEntityRepository implements MagicRepositoryInterface
{
    buildEntity(data: object): DefaultEntity {
        return new MagicEntity(data["id"], data["name"], data["styleIds"]);
    }

    async fetchMagesFromMagic(repository: GeneralRepositoryInterface, mageRepository: MageRepositoryInterface, id: number): Promise<MageEntity[]> {
        var allMages: MageEntity[] = await mageRepository.getAllEntitysOfThisType(repository) as MageEntity[];
        return allMages.filter(mage=>mage.getMagicsIds().includes(id));
    }

    async matchMagicsOfStyle(repository: GeneralRepositoryInterface, styleRepository: StyleRepositoryInterface, id: number): Promise<MagicEntity[]> {
        var allMagics: MagicEntity[] = await this.getAllEntitysOfThisType(repository) as MagicEntity[];
        allMagics = await styleRepository.injectStylesInMagics(repository, allMagics);
        return allMagics.filter(magic=>
            magic.getStylesObject().map(s=>s.getId()).includes(id)
        );
    }

    getBasicDataAcessValue(): object {
        return {'name': "magics"};
    }
}

