import ControlerInterface from "./controlerInterface";

export default abstract class BaseJsonControler implements ControlerInterface{
    public async getResponse(params: string): Promise<string>{
        return JSON.stringify(await this.getObjectResponse(params));
    }

    protected abstract getObjectResponse(params: string): Promise<object>;

    public abstract getControlerDescription(): string;
}