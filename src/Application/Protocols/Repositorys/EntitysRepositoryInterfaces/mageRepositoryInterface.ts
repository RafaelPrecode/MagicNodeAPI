import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import { EntityRepositoryInterface } from "../entityRepositoryInterface";
import { GeneralRepositoryInterface } from "../generalRepositoryInterface";
import { MagicRepositoryInterface } from "./magicRepositoryInterface";
import { StyleRepositoryInterface } from "./styleRepositoryInterface";

export interface MageRepositoryInterface extends EntityRepositoryInterface{
    fetchMagicsFromMage(repository: GeneralRepositoryInterface, magicRepository: MagicRepositoryInterface, id: number): Promise<MagicEntity[]>;
    fetchStylesFromMage(repository: GeneralRepositoryInterface, magicRepository: MagicRepositoryInterface, styleRepository: StyleRepositoryInterface, id: number): Promise<MagicStyleEntity[]>;
}