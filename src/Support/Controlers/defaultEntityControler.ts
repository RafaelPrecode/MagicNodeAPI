import BaseJsonControler from "./baseJsonControler";
import DefaultUsecases from "../../Domain/Usecases/defaultUsecases";
import { DefaultEntity } from "../../Domain/Entities/defaultEntity";
import {getRouteLevel, getNotFoundResponseObject, getInvalidParamsResponseObject} from "../../Utils/Route/routeFunctions";
import { AlterationData } from "../../Utils/alterationData";
import {removeArgumentsFromQuery, treatQueryToLeaveOnlyArguments} from "../../Utils/Route/queryTreater"


const defaultRouteSections = {
    "": async function(repos: DefaultUsecases, controler: DefaultEntityControler, query: string): Promise<object>{
        return await repos.getAll();
    },
    "get": async function(repos: DefaultUsecases, controler: DefaultEntityControler, query: string): Promise<object>{
        return await repos.getById(controler.getIdFromQuery(query));
    },
    "create": async function(repos: DefaultUsecases, controler: DefaultEntityControler, query: string): Promise<object>{
        if(!controler.getEntityFromQuery(query)) return getInvalidParamsResponseObject();
        return await repos.create(controler.getEntityFromQuery(query));
    },
    "delete": async function(repos: DefaultUsecases, controler: DefaultEntityControler, query: string): Promise<object>{
        return await repos.delete(controler.getIdFromQuery(query));
    },
    "update": async function(repos: DefaultUsecases, controler: DefaultEntityControler, query: string): Promise<object>{
        if(!controler.getEntityFromQuery(query)) return getInvalidParamsResponseObject();
        return await repos.update(controler.getEntityFromQuery(query));
    },
    "alterate": async function(repos: DefaultUsecases, controler: DefaultEntityControler, query: string): Promise<object>{
        return await repos.updateProperty(controler.getIdFromQuery(query), controler.getPropertyAlterationFromQuery(query));
    }
};



export default abstract class DefaultEntityControler extends BaseJsonControler{
    protected defaultUsecases: DefaultUsecases;
    protected routeSections: object;

    constructor(defaultUsecases: DefaultUsecases){
        super();
        this.defaultUsecases = defaultUsecases;
        this.routeSections = defaultRouteSections;
    }


    public abstract getControlerDescription(): string;

    protected async getObjectResponse(query: string="") : Promise<object>{
        var functionName: string = getRouteLevel(removeArgumentsFromQuery(query), 0).replace("/", "");
        var dataFunction: (repos:DefaultUsecases, controler: DefaultEntityControler, query: string)=>object =
            this.routeSections[functionName.toLowerCase()];

        if(!dataFunction) return getNotFoundResponseObject();
        return await dataFunction(this.defaultUsecases, this, query);       //@ não tem efeito?
    }




    public getIdFromQuery(query: string): number{
        var regexp = new RegExp(/\/[0-9]+/);
        var result = regexp.exec(query);
        return (result) ? parseInt(result[0].replace("/","")) : -1;
    }

    public getEntityFromQuery(query: string): DefaultEntity{
        query = treatQueryToLeaveOnlyArguments(query);
        var objectParams = Object.fromEntries(new URLSearchParams(query));
        var entity: DefaultEntity = this.formulateEntityFromParams(objectParams);
        return (entity) ? entity : null;
    }
    
    public getPropertyAlterationFromQuery(query: string): AlterationData{
        query = treatQueryToLeaveOnlyArguments(query);
        var objectParams = Object.fromEntries(new URLSearchParams(query));
        return new AlterationData(objectParams['name'], objectParams['data']);
    }


    protected abstract formulateEntityFromParams(objectParams: object): DefaultEntity;
    //public abstract formulateQueryFromEntity(entity: DefaultEntity): string;

}









export function getNumberArrayFromString(text: string): number[]{
    if(!text) return null;
    var strArray: string[] = text.replace(/\]|\[/g, "").split(",");
    var numberArray: number[] = [];
    strArray.forEach(element=>
        {numberArray.push(parseInt(element))}
    );


    return numberArray;
}