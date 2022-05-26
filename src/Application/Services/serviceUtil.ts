export abstract class ServiceUtil
{
    public static getPersistenceErrorReponse(): object{
        return {"errorType": "Persistence Issue..."};
    }

    public static getIdDoesExistErrorReponse(): object{
        return {"errorType":'ID already exists'};
    }

    public static getIdDoNotExistErrorReponse(): object{
        return {"errorType":'ID do not exists'};
    }

    public static getBoolResponse(value: boolean, extensionObject: object = null): object{
        var reponse = {"operationWasSuccessful": value};
        if(extensionObject)
            Object.assign(reponse, extensionObject);
    
        return reponse;
    }

}

