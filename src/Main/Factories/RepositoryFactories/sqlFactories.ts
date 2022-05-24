import { MagicStyleSQLRepository } from "../../../Infra/lib/Repositorys/SQL/magicStyleSQLRepository";
import { RepositoryFactoriesInterface } from "./repositoryFactoriesInterface";

import { EntityRepositoryInterface } from "../../../Application/Protocols/Repositorys/entityRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../Application/Protocols/Repositorys/generalRepositoryInterface";
import { GeneralSQLRepository } from "../../../Infra/lib/Repositorys/SQL/generalSQLRepository";
import { MageSQLRepository } from "../../../Infra/lib/Repositorys/SQL/mageSQLRepository";
import { MagicSQLRepository } from "../../../Infra/lib/Repositorys/SQL/magicSQLRepository";



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
    
    makeMageRepository(): EntityRepositoryInterface{
        return new MageSQLRepository();
    }
    
    makeMagicRepository(): EntityRepositoryInterface{
        return new MagicSQLRepository();
    }
    
    makeStyleRepository(): EntityRepositoryInterface{
        return new MagicStyleSQLRepository();
    }
}


export function startUpSql(){
    var factories = new SqlFactories();
    var generalRepository: GeneralSQLRepository = factories.makeGeneralRepository() as GeneralSQLRepository;

    generalRepository.createAllTables();
}


