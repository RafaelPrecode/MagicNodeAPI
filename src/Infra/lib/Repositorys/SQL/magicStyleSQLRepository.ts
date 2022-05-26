import { StyleRepositoryInterface } from "../../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { DefaultEntity } from "../../../../Domain/Entities/defaultEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import { BasicSQLEntityRepository } from "./basicSQLEntityRepository";


export class MagicStyleSQLRepository extends BasicSQLEntityRepository implements StyleRepositoryInterface
{
    buildEntity(data: object): DefaultEntity {
        return new MagicStyleEntity(data["id"], data["name"]);
    }


    fetchMagicsFromStyle(): Promise<MagicEntity[]> {
        throw new Error("Method not implemented."); //@
    }

    fetchMagesFromStyle(): Promise<MagicStyleEntity[]> {
        throw new Error("Method not implemented."); //@
    }

    injectStylesInMagics(repository: GeneralRepositoryInterface, magics: MagicEntity[]): Promise<MagicEntity[]> {
        throw new Error("Method not implemented."); //@
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



