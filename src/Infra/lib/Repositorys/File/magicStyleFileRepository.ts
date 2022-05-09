import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import { BasicGeneralRepository } from "../../../../Application/Protocols/Repositorys/basicGeneralRepository";

export class MagicStyleFileRepository extends BasicGeneralRepository
{
    buildEntityArray(data: object[]): DefaultEntity[] {
        if (!data) return null;

        var allEntitys: DefaultEntity[] = [];
        data.forEach(obj=>{
            allEntitys.push(new MagicStyleEntity(obj["id"], obj["name"]));
        });

        return allEntitys;
    }


    getDataAcessValue(): object {
        return {'name': "styles"};
    }

}

