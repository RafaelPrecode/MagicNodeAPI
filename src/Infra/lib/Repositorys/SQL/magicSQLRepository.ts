import { MageRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { MagicRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { StyleRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MageEntity } from "../../../../Domain/Entities/mageEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { BasicSQLEntityRepository } from "./basicSQLEntityRepository";

export class MagicSQLRepository extends BasicSQLEntityRepository implements MagicRepositoryInterface
{
    buildEntity(data: object): DefaultEntity {
        return new MagicEntity(data["id"], data["name"],JSON.parse(data["styleIds"]));
    }

    fetchMagesFromMagic(repository: GeneralRepositoryInterface, mageRepository: MageRepositoryInterface, id: number): Promise<MageEntity[]> {
        throw new Error("Method not implemented."); //@
    }

    matchMagicsOfStyle(repository: GeneralRepositoryInterface, styleRepository: StyleRepositoryInterface, id: number): Promise<MagicEntity[]> {
        throw new Error("Method not implemented."); //@
    }

    getBasicDataAcessValue(): object {
        return {'name': "magics"};
    }

    getUpdateDataAcessValue(entity: DefaultEntity): object {
        var magicEntity: MagicEntity = entity as MagicEntity;
        var acess = this.getBasicDataAcessValue();
        acess['columValue'] = `id = ${magicEntity.getId()}, name = '${magicEntity.getName()}', styleIds = '[${magicEntity.getStyleIds()}]'`;
        return acess;
    }
}



