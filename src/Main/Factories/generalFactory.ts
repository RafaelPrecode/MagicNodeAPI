
import { HelpControler } from "../../Support/Controlers/helpControler";
import { MagesControler } from "../../Support/Controlers/magesControler";
import { MagicsControler } from "../../Support/Controlers/magicsControler";
import { StylesControler } from "../../Support/Controlers/stylesControler";

import { MageService } from "../../Application/Services/mageService";
import { MagicService } from "../../Application/Services/magicService";
import { MagicStyleService } from "../../Application/Services/magicStyleService";

import { FileFactories } from "./RepositoryFactories/fileFactorites";


//*@
//Define choosen factories
var factories = new FileFactories();
//


// fabricate everthing
var fileRepository = factories.makeGeneralRepository();
var styleService = new MagicStyleService(factories.makeStyleRepository(), fileRepository);
var magicService = new MagicService(factories.makeMagicRepository(), factories.makeGeneralRepository(), styleService);
var mageService = new MageService(factories.makeMageRepository(), fileRepository, styleService);
magicService.injectMageService(mageService);
mageService.injectMagicService(magicService);
//


// distribute services
export function makeHelpControler(): HelpControler{
    return new HelpControler();
}

export function makeMageControler(): MagesControler{
    return new MagesControler(mageService);
}

export function makeMagicControler(): MagicsControler{
    return new MagicsControler(magicService);
}

export function makeStyleControler(): StylesControler{
    return new StylesControler(styleService);
}
//
