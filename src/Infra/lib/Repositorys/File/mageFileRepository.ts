import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MageEntity } from "../../../../Domain/Entities/mageEntity";
import { BasicGeneralRepository } from "../../../../Application/Protocols/Repositorys/basicGeneralRepository";

export class MageFileRepository extends BasicGeneralRepository
{
    buildEntityArray(data: object[]): DefaultEntity[] {
        if (!data) return null;

        var allEntitys: DefaultEntity[] = [];
        data.forEach(obj=>{
            allEntitys.push(new MageEntity(obj["id"], obj["name"], obj["level"],obj["magicsIds"]));
        });

        return allEntitys;
    }


    getDataAcessValue(): object {
        return {'name': "mages"};
    }

}

