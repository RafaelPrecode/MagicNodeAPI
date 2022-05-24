import http from "http";

import { routes } from "./routes";
import ControlerInterface from "../Support/Controlers/controlerInterface";
import {getNotFoundResponseObject, getRouteLevel} from "../Utils/Route/routeFunctions";

http.createServer(async function(request,response){
    response.writeHead(200, {"Content-Type": "application/json"});
    var chousenRouteFunction: ()=>ControlerInterface = routes[getRouteLevel(request.url, 0)];

    if(chousenRouteFunction != null){
        response.end(await chousenRouteFunction().getResponse(getRouteLevel(request.url, 1, true)));
    }else{
        pageNotExistReponse(response);
    }
}).listen(4200, ()=>console.log("running the server"));



function pageNotExistReponse(response: http.ServerResponse): void{
    response.end(JSON.stringify(getNotFoundResponseObject()));
}