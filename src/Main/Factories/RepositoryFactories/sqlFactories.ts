import { MagicStyleSQLRepository } from "../../../Infra/lib/Repositorys/SQL/magicStyleSQLRepository";
import { RepositoryFactoriesInterface } from "./repositoryFactoriesInterface";

import { EntityRepositoryInterface } from "../../../Application/Protocols/Repositorys/entityRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { GeneralSQLRepository } from "../../../Infra/lib/Repositorys/SQL/generalSQLRepository";
import { MageSQLRepository } from "../../../Infra/lib/Repositorys/SQL/mageSQLRepository";
import { MagicSQLRepository } from "../../../Infra/lib/Repositorys/SQL/magicSQLRepository";
import { MageRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { MagicRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { StyleRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";



export class SqlFactories implements RepositoryFactoriesInterface{
    makeGeneralRepository(): GeneralRepositoryInterface{
        return new GeneralSQLRepository({
            host: 'localhost',
            port: '3323',
            user: 'root',
            password: '',
            database: 'magicmage_db'
        });
    }
    
    makeMageRepository(): MageRepositoryInterface{
        return new MageSQLRepository();
    }
    
    makeMagicRepository(): MagicRepositoryInterface{
        return new MagicSQLRepository();
    }
    
    makeStyleRepository(): StyleRepositoryInterface{
        return new MagicStyleSQLRepository();
    }
}


export function startUpSql(){
    var factories = new SqlFactories();
    var generalRepository: GeneralSQLRepository = factories.makeGeneralRepository() as GeneralSQLRepository;

    generalRepository.createAllTables();
}


