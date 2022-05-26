
import { HelpControler } from "../../Support/Controlers/helpControler";
import { MagesControler } from "../../Support/Controlers/magesControler";
import { MagicsControler } from "../../Support/Controlers/magicsControler";
import { StylesControler } from "../../Support/Controlers/stylesControler";

import { MageService } from "../../Application/Services/mageService";
import { MagicService } from "../../Application/Services/magicService";
import { MagicStyleService } from "../../Application/Services/magicStyleService";

import { FileFactories } from "./RepositoryFactories/fileFactorites";
import { SqlFactories } from "./RepositoryFactories/sqlFactories";
import { MagicRepositoryInterface } from "../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { MageRepositoryInterface } from "../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { StyleRepositoryInterface } from "../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";


//*@
//Define choosen factories
var factories = new FileFactories();
//
var factories = new SqlFactories();



// fabricate everthing
var fileRepository = factories.makeGeneralRepository();

var mageRepository: MageRepositoryInterface = factories.makeMageRepository();
var magicRepository: MagicRepositoryInterface = factories.makeMagicRepository();
var styleRepository: StyleRepositoryInterface = factories.makeStyleRepository();

var styleService = new MagicStyleService(styleRepository, fileRepository);
var magicService = new MagicService(magicRepository, fileRepository);
var mageService = new MageService(mageRepository, fileRepository);

magicService.injectMageRepository(mageRepository);
magicService.injectStyleRepository(styleRepository);

mageService.injectMagicRepository(magicRepository);
mageService.injectStyleRepository(styleRepository);
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
