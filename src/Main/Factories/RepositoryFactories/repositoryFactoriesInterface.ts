import { EntityRepositoryInterface } from "../../../Application/Protocols/Repositorys/entityRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../Application/Protocols/Repositorys/generalRepositoryInterface";

export interface RepositoryFactoriesInterface{
    makeGeneralRepository(): GeneralRepositoryInterface;
    makeMageRepository(): EntityRepositoryInterface;
    makeMagicRepository(): EntityRepositoryInterface;
    makeStyleRepository(): EntityRepositoryInterface;
}