import ControlerInterface from "./controlerInterface";


export class HelpControler implements ControlerInterface {
    public getControlerDescription(): string {
        return "Take your doubts here";
    }
    
    public getResponse(): string{
        return`
    Welcome!
        `;
    }
    
}
    