import ControlerInterface from "./controlerInterface";

export default abstract class BaseJsonControler implements ControlerInterface{
    public getResponse(params: string): string{
        return JSON.stringify(this.getObjectResponse(params));
    }

    protected abstract getObjectResponse(params: string): object;

    public abstract getControlerDescription(): string;
}