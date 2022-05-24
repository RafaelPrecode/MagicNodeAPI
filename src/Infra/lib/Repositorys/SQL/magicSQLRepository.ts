import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { BasicSQLEntityRepository } from "./basicSQLEntityRepository";

export class MagicSQLRepository extends BasicSQLEntityRepository
{
    buildEntity(data: object): DefaultEntity {
        return new MagicEntity(data["id"], data["name"],JSON.parse(data["styleIds"]));
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



