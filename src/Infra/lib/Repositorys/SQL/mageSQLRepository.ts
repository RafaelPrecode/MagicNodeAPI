import { MageRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { MagicRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { StyleRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MageEntity } from "../../../../Domain/Entities/mageEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import { BasicSQLEntityRepository } from "./basicSQLEntityRepository";

export class MageSQLRepository extends BasicSQLEntityRepository implements MageRepositoryInterface
{
    buildEntity(data: object): DefaultEntity {
        return new MageEntity(data["id"], data["name"], data["level"],JSON.parse(data["magicsIds"]));
    }   
    
    fetchMagicsFromMage(repository: GeneralRepositoryInterface, magicRepository: MagicRepositoryInterface, id: number): Promise<MagicEntity[]> {
        throw new Error("Method not implemented."); //@
    }

    fetchStylesFromMage(repository: GeneralRepositoryInterface, magicRepository: MagicRepositoryInterface, styleRepository: StyleRepositoryInterface, id: number): Promise<MagicStyleEntity[]> {
        throw new Error("Method not implemented."); //@
    }

    getBasicDataAcessValue(): object {
        return {'name': 'mages'};
    }

    getUpdateDataAcessValue(entity: DefaultEntity): object {
        var mageEntity: MageEntity = entity as MageEntity;
        var acess = this.getBasicDataAcessValue();
        acess['columValue'] = `id = ${mageEntity.getId()}, name = '${mageEntity.getName()}', level = ${mageEntity.getLevel()}, magicIds = '[${mageEntity.getMagicsIds()}]'`;
        return acess;
    }
}

