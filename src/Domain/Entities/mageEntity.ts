import { DefaultEntity } from "./defaultEntity";

export class MageEntity extends DefaultEntity{
    private level: number;
    private magicsIds: number[];

    constructor(id: number, name: string, level: number, magicsIds: number[]){
        super(id, name);
        this.level = level;
        this.magicsIds = magicsIds;
    }
    

    public getLevel(): number{
        return this.level;
    }
    
    public setLevel(level: number): void{
        this.level = level;
    }

    
    public getMagicsIds(): number[]{
        return this.magicsIds;
    }
    
    public setMagicsIds(magicsIds: number[]): void{
        this.magicsIds = magicsIds;
    }
}

