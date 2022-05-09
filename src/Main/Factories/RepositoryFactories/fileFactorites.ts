import { GeneralFileRepository } from "../../../Infra/lib/Repositorys/File/generalFileRepository";
import { MageFileRepository } from "../../../Infra/lib/Repositorys/File/mageFileRepository";
import { MagicFileRepository } from "../../../Infra/lib/Repositorys/File/magicFileRepository";
import { MagicStyleFileRepository } from "../../../Infra/lib/Repositorys/File/magicStyleFileRepository";
import { EntityRepositoryInterface } from "../../../Application/Protocols/Repositorys/entityRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { RepositoryFactoriesInterface } from "./repositoryFactoriesInterface";


export class FileFactories implements RepositoryFactoriesInterface{
    makeGeneralRepository(): GeneralRepositoryInterface{
        return new GeneralFileRepository('src/Infra/db/File/fileDataBank.json');
    }
    
    makeMageRepository(): EntityRepositoryInterface{
        return new MageFileRepository();
    }
    
    makeMagicRepository(): EntityRepositoryInterface{
        return new MagicFileRepository();
    }
    
    makeStyleRepository(): EntityRepositoryInterface{
        return new MagicStyleFileRepository();
    }
}