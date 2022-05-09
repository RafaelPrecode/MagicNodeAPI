import { DefaultEntity } from "./defaultEntity";
import { MagicStyleEntity } from "./magicStyleEntity";

export class MagicEntity extends DefaultEntity{
    private styleIds: number[];
    private styles: MagicStyleEntity[];

    constructor(id: number, name: string, ids: number[]){
        super(id,name);
        this.styleIds = ids;
    }

    public getStyleIds(): number[]{
        return this.styleIds;
    }

    public setStyleIds(ids: number[]){
        this.styleIds = ids;
    }

    public getStylesObject(): MagicStyleEntity[]{
        return this.styles;
    }
    
    public setStylesObject(obj: MagicStyleEntity[]){
        this.styles = obj;
    }

    public deleteStyleIds(): void{
        delete this.styleIds;
    }
}

