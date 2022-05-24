import { GeneralRepositoryInterface } from '../../../../Application/Protocols/Repositorys/generalRepositoryInterface';
import mysql, { OkPacket } from 'mysql';
import util from 'util';
import { DefaultEntity } from '../../../../Domain/Entities/defaultEntity';

export class GeneralSQLRepository implements GeneralRepositoryInterface
{
    dataBank: mysql.Connection;

    constructor(configuration: object){
        this.dataBank = mysql.createConnection(configuration);
        this.dataBank.connect(callbackConnection);
    }

    async getDataInAcess(acess: object): Promise<object[]> {
        return await this.makeSqlPromise(`SELECT * FROM ${acess['name']} ${acess['extra']}`) as object[];
    }
    
    async registryNewEntry(acess: object, data: DefaultEntity, id?: number): Promise<number> {
        var packet: OkPacket = await this.makeSqlPromise(`INSERT INTO ${acess['name']} VALUES ${getEntityAsDataArray(data)}`);
        return packet.insertId;
    }

    async deleteEntryById(acess: object, id: number): Promise<boolean> {
        var packet: OkPacket = await this.makeSqlPromise(`DELETE FROM ${acess['name']} WHERE ${acess['name']}.id = ${id}`);
        return packet.protocol41;
    }

    async updateAnEntry(acess: object, data: DefaultEntity): Promise<boolean> {
        console.log(`UPDATE ${acess['name']} SET ${acess['columValue']} WHERE id=${data.getId()}`);
        var packet: OkPacket = await this.makeSqlPromise(`UPDATE ${acess['name']} SET ${acess['columValue']} WHERE id=${data.getId()}`);
        return packet.protocol41;
    }


    createAllTables(){
        this.dataBank.query("CREATE TABLE test(id int AUTO_INCREMENT)", callbackConnection);
    }


    async makeSqlPromise(query: string): Promise<any>{
        const queryMaker = util.promisify(this.dataBank.query).bind(this.dataBank);
        return (async (): Promise<any> => {
            return await queryMaker(query);
        })()
    }

}

function callbackConnection(err: mysql.MysqlError){
    if(err) throw err;
}


function getEntityAsDataArray(entity: object): string{
    var str = "(";
    var keys = Object.keys(entity);
    var length = keys.length;

    for(let i=0;i<length;i++){
        str+=treatDataToSqlString(entity[keys[i]]);
        if(i!=length-1){
            str+=", ";
        }
    }

    return str+")";
}

function getEntityAsDataObject(entity: object){
    
}


function treatDataToSqlString(data: object): string{
    if(Number.isNaN(data)) return null;

    switch(typeof(data)){
        case 'string':
            return `'${data}'`;
        case 'object':
            return `'${JSON.stringify(data)}'`;
        default:
            return data;
    }
}