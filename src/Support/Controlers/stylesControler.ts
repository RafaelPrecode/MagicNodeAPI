import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import { MagicStyleEntity } from "../../Domain/Entities/magicStyleEntity";
import DefaultEntityControler from "./defaultEntityControler";


export class StylesControler extends DefaultEntityControler {
    protected formulateEntityFromParams(objectParams: object): DefaultEntity {
        var id: number = parseInt(objectParams["id"]);
        var name: string = objectParams["name"];

        if(!(name)) return null;

        return new MagicStyleEntity(id, name);
    }


    public getControlerDescription(): string {
        return "Data and functionalities about all magic styles";
    }
}
    