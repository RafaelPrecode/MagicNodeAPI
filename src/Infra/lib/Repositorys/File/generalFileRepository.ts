import { GeneralRepositoryInterface } from '../../../../Application/Protocols/Repositorys/generalRepositoryInterface';
import fs from 'fs';


export class GeneralFileRepository implements GeneralRepositoryInterface
{
    private fileDir: string;
    
    constructor(fileDir: string){
        this.fileDir = fileDir;
    }

    getDataInAcess(dataAcessValue: object): object[] {
        return this.getAllData()[dataAcessValue['name'] as string];
    }

    getAllData(): object[]{
        var buffer: Buffer = fs.readFileSync(this.getFilePath());
        return JSON.parse(buffer.toString());
    }


    setDataInAcess(acess: object, data: object): void{
        var allData: object[] = this.getAllData();
        allData[acess['name']] = data;
        fs.writeFileSync(this.getFilePath(), JSON.stringify(allData, null, 2));
    }


    getFilePath(): string{
        return `${process.cwd()}\\${this.fileDir}`;
    }

}

