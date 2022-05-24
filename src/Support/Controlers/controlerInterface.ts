export default interface ControlerInterface{
    getResponse(params: string): Promise<string>;
    getControlerDescription(): string;
}