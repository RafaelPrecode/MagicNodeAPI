import { GeneralRepositoryInterface } from '../../../../Application/Protocols/Repositorys/generalRepositoryInterface';
import fs from 'fs';
import { DefaultEntity } from '../../../../Domain/Entities/defaultEntity';


export class GeneralFileRepository implements GeneralRepositoryInterface
{
    private fileDir: string;
    
    constructor(fileDir: string){
        this.fileDir = fileDir;
    }

    async getDataInAcess(dataAcessValue: object): Promise<object[]> {
        return this.getAllData()[dataAcessValue['name'] as string];
    }

    async registryNewEntry(acess: object, data: DefaultEntity, id?: number): Promise<number> {
        try{
            var allData = this.getAllData();
            var entityData: object[] = allData[acess['name']] as object[];

            if(!id){
                id = await this.getIdToNewEntity(entityData);
                data.setId(id);
            }

            entityData.push(data);
            this.registryAllData(allData);
        }catch(e){
            return null;
        }
        return id;
    }


    async deleteEntryById(acess: object, id: number): Promise<boolean> {
        try{
            var acessData = await this.getDataInAcess(acess);
            acessData = acessData.filter(data=>data['id']!=id);
            var allData = this.getAllData();
            allData[acess['name']] = acessData;
            this.registryAllData(allData);
        }catch(e){
            return false
        }
        return true;
    }

    async updateAnEntry(acess: object, data: DefaultEntity): Promise<boolean> {
        if(await this.deleteEntryById(acess, data.getId()) && await this.registryNewEntry(acess, data, data.getId())){
            return true;
        }
        return false;
    }

    getAllData(): object{
        var buffer: Buffer = fs.readFileSync(this.getFilePath());
        return JSON.parse(buffer.toString());
    }

    getFilePath(): string{
        return `${process.cwd()}\\${this.fileDir}`;
    }

    async getIdToNewEntity(allData: object[]): Promise<number> {
        var higherIndex: number = getHigherIndexFromDefaultEntityArray(allData);
        return higherIndex+1;
    }

    registryAllData(allData: object): void{
        fs.writeFileSync(this.getFilePath(), JSON.stringify(allData, null, 2));
    }

}



function getHigherIndexFromDefaultEntityArray(allData: object[]): number{
    return allData.map(entity=>entity['id']).sort((a,b)=>b-a)[0];
}
