import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import { BasicSQLEntityRepository } from "./basicSQLEntityRepository";


export class MagicStyleSQLRepository extends BasicSQLEntityRepository
{
    buildEntity(data: object): DefaultEntity {
        return new MagicStyleEntity(data["id"], data["name"]);
    }

    getBasicDataAcessValue(): object {
        return {'name': "styles"};
    }

    getUpdateDataAcessValue(entity: DefaultEntity): object {
        var styleEntity: MagicStyleEntity = entity as MagicStyleEntity;
        var acess = this.getBasicDataAcessValue();
        acess['columValue'] = `id = ${styleEntity.getId()}, name = '${styleEntity.getName()}'`;;
        return acess;
    }
}



