import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import { MagicEntity } from "../../Domain/Entities/magicEntity";
import MagicUsecases from "../../Domain/Usecases/magicUsecases";
import DefaultEntityControler from "./defaultEntityControler";
import { getNumberArrayFromString } from "./defaultEntityControler";


export class MagicsControler extends DefaultEntityControler{
    constructor(magicUsecases: MagicUsecases){
        super(magicUsecases);
        this.routeSections['getusersof'] = functionGetUsersOf();
        this.routeSections['getmagicfromstyle'] = functionGetMagicsOfStyle();
    }

    protected formulateEntityFromParams(objectParams: object): DefaultEntity {
        var id: number = parseInt(objectParams["id"]);
        var name: string = objectParams["name"];
        var styleIds: number[] = getNumberArrayFromString(objectParams["styleIds"]);

        if(!(name && styleIds)) return null;

        return new MagicEntity(id, name, styleIds);
    }

    /*
    public formulateQueryFromEntity(entity: DefaultEntity): string{
        var magicEntity = entity as MagicEntity;
        return `?id=${magicEntity.getId()}&name=${magicEntity.getName()}`;
    }
    */

    public getControlerDescription(): string {
        return "Data and functionalities about the registred magics";
    }
}

function functionGetUsersOf(): Function{
    return async function(repos: MagicUsecases, controler: DefaultEntityControler, query: string): Promise<object>{
        return await repos.getUsersFromMagic(controler.getIdFromQuery(query));
    };
}

function functionGetMagicsOfStyle(): Function{
    return async function(repos: MagicUsecases, controler: DefaultEntityControler, query: string):  Promise<object>{
        return await repos.getAllMagicFromStyle(controler.getIdFromQuery(query));
    };
}