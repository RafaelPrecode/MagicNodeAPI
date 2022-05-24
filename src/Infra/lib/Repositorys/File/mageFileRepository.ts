import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MageEntity } from "../../../../Domain/Entities/mageEntity";
import { BasicFileEntityRepository } from "./basicFileEntityRepository";

export class MageFileRepository extends BasicFileEntityRepository
{
    buildEntity(data: object): DefaultEntity {
        return new MageEntity(data["id"], data["name"], data["level"],data["magicsIds"]);
    }

    getBasicDataAcessValue(): object {
        return {'name': "mages"};
    }

}

