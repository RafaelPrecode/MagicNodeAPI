import { MageEntity } from "../../../../Domain/Entities/mageEntity";
import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { EntityRepositoryInterface } from "../entityRepositoryInterface";
import { GeneralRepositoryInterface } from "../generalRepositoryInterface";
import { MageRepositoryInterface } from "./mageRepositoryInterface";
import { StyleRepositoryInterface } from "./styleRepositoryInterface";

export interface MagicRepositoryInterface extends EntityRepositoryInterface{
    fetchMagesFromMagic(repository: GeneralRepositoryInterface, mageRepository: MageRepositoryInterface, id: number): Promise<MageEntity[]>;
    matchMagicsOfStyle(repository: GeneralRepositoryInterface, styleRepository: StyleRepositoryInterface, id: number): Promise<MagicEntity[]>;
}