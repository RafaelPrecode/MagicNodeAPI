import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { BasicFileEntityRepository } from "./basicFileEntityRepository";

export class MagicFileRepository extends BasicFileEntityRepository
{
    buildEntity(data: object): DefaultEntity {
        return new MagicEntity(data["id"], data["name"], data["styleIds"]);
    }

    getBasicDataAcessValue(): object {
        return {'name': "magics"};
    }
}

