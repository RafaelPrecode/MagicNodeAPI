import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import { BasicFileEntityRepository } from "./basicFileEntityRepository";


export class MagicStyleFileRepository extends BasicFileEntityRepository
{
    buildEntity(data: object): DefaultEntity {
        return new MagicStyleEntity(data["id"], data["name"]);
    }

    getBasicDataAcessValue(): object {
        return {'name': "styles"};
    }
}