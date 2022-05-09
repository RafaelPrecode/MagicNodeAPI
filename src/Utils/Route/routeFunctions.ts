

export function getRouteLevel(route: string, level: number, acumulative: boolean = false): string{
    var allLevels = route.split('/').slice(1);
    
    for(let i=0;i<allLevels.length;i++){
        allLevels[i]='/'+allLevels[i];  
    }

    if(acumulative){
        for(let i=level+1 ; i<allLevels.length ; i++){
            allLevels[level]+=allLevels[i];
        }
    }
    
    return (allLevels[level]!=undefined) ? allLevels[level] : "";
}

export function getNotFoundResponseObject(): object{
    return {"error": "Route does not exist"};
}

export function getInvalidParamsResponseObject(): object{
    return {"error": "Invalid params"};
}