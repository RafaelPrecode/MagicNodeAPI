import { EntityRepositoryInterface } from "../../../Application/Protocols/Repositorys/entityRepositoryInterface";
import { MageRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/mageRepositoryInterface";
import { MagicRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/magicRepositoryInterface";
import { StyleRepositoryInterface } from "../../../Application/Protocols/Repositorys/EntitysRepositoryInterfaces/styleRepositoryInterface";
import { GeneralRepositoryInterface } from "../../../Application/Protocols/Repositorys/generalRepositoryInterface";

export interface RepositoryFactoriesInterface{
    makeGeneralRepository(): GeneralRepositoryInterface;
    makeMageRepository(): MageRepositoryInterface;
    makeMagicRepository(): MagicRepositoryInterface;
    makeStyleRepository(): StyleRepositoryInterface;
}