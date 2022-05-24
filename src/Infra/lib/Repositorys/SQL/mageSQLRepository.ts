import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MageEntity } from "../../../../Domain/Entities/mageEntity";
import { BasicSQLEntityRepository } from "./basicSQLEntityRepository";

export class MageSQLRepository extends BasicSQLEntityRepository
{
    buildEntity(data: object): DefaultEntity {
        return new MageEntity(data["id"], data["name"], data["level"],JSON.parse(data["magicsIds"]));
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

