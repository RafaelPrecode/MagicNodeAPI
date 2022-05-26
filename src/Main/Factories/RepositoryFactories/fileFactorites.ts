import { GeneralFileRepository } from "../../../Infra/lib/Repositorys/File/generalFileRepository";
import { MageFileRepository } from "../../../Infra/lib/Repositorys/File/mageFileRepository";
import { MagicFileRepository } from "../../../Infra/lib/Repositorys/File/magicFileRepository";
import { MagicStyleFileRepository } from "../../../Infra/lib/Repositorys/File/magicStyleFileRepository";
import { EntityRepositoryInterface } from "../../../Application/Protocols/Repositorys/entityRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { RepositoryFactoriesInterface } from "./repositoryFactoriesInterface";
import { MageRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { MagicRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { StyleRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";


export class FileFactories implements RepositoryFactoriesInterface{
    makeGeneralRepository(): GeneralRepositoryInterface{
        return new GeneralFileRepository('src/Infra/db/File/fileDataBank.json');
    }
    
    makeMageRepository(): MageRepositoryInterface{
        return new MageFileRepository();
    }
    
    makeMagicRepository(): MagicRepositoryInterface{
        return new MagicFileRepository();
    }
    
    makeStyleRepository(): StyleRepositoryInterface{
        return new MagicStyleFileRepository();
    }
}