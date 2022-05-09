import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { BasicGeneralRepository } from "../../../../Application/Protocols/Repositorys/basicGeneralRepository";

export class MagicFileRepository extends BasicGeneralRepository
{
    buildEntityArray(data: object[]): DefaultEntity[] {
        if (!data) return null;

        var allEntitys: DefaultEntity[] = [];
        data.forEach(obj=>{
            allEntitys.push(new MagicEntity(obj["id"], obj["name"], obj["styleIds"]));
        });

        return allEntitys;
    }


    getDataAcessValue(): object {
        return {'name': "magics"};
    }

}

