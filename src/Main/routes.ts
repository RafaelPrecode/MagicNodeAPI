import ControlerInterface from "../Support/Controlers/controlerInterface";
import {makeHelpControler, makeMageControler, makeMagicControler, makeStyleControler} from "./Factories/generalFactory";


class DefaultControler implements ControlerInterface{
    public getControlerDescription(): string {
        return "";
    }

    public async getResponse(): Promise<string>{
        var allControlers: string[] = Object.keys(routes).slice(1);
        var response: string = "";
        
        allControlers.forEach(element => {
            response+=`${element}\t\t\t${routes[element]().getControlerDescription()}\n`;
        });
        
        return response;
    }

}



export const routes = {
    "/": function(): ControlerInterface{
        return new DefaultControler();
    },
    "/magics": function(): ControlerInterface{
        return makeMagicControler();
    },
    "/mages": function(): ControlerInterface{
        return makeMageControler();
    },
    "/styles":function(): ControlerInterface{
        return makeStyleControler();
    },
    "/help":function(): ControlerInterface{
        return makeHelpControler();
    },
};
//

