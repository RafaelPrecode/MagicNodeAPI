import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import { MageEntity } from "../../Domain/Entities/mageEntity";
import MageUsecases from "../../Domain/Usecases/mageUsecases";
import DefaultEntityControler from "./defaultEntityControler";
import { getNumberArrayFromString } from "./defaultEntityControler";



export class MagesControler extends DefaultEntityControler{
    constructor(mageCases: MageUsecases){
        super(mageCases);
        
        this.routeSections['getmagics'] = functionGetMagics();
        this.routeSections['getstylesofmage'] = functionGetStylesOfMage();
    }


    protected formulateEntityFromParams(objectParams: object): DefaultEntity {
        var id: number = parseInt(objectParams["id"]);
        var name: string = objectParams["name"];
        var level: number = parseInt(objectParams["level"]);
        var magicsIds: number[] = getNumberArrayFromString(objectParams["magicsIds"]);

        if(!(name && level && magicsIds)) return null;

        return new MageEntity(id, name, level, magicsIds);
    }

    /*
    public formulateQueryFromEntity(entity: DefaultEntity): string{
        var mageEntity = entity as MageEntity;
        return `
            ?id=${mageEntity.getId()}&name=${mageEntity.getName()}
            &level=${mageEntity.getLevel()}&magicsIds=${mageEntity.getMagicsIds()}`;
    }
    */


    public getControlerDescription(): string {
        return "Data and functionalities about the mundial mages";
    }

}


function functionGetMagics(): Function{
    return function(repos: MageUsecases, controler: DefaultEntityControler, query: string): object{
        return repos.getMagicsFromMage(controler.getIdFromQuery(query));
    };
}


function functionGetStylesOfMage(): Function{
    return function(repos: MageUsecases, controler: DefaultEntityControler, query: string): object{
        return repos.getStylesOfMage(controler.getIdFromQuery(query));
    };
}

