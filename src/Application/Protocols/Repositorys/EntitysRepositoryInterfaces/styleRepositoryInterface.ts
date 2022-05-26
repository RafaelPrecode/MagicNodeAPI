import { MagicEntity } from "../../../../Domain/Entities/magicEntity";
import { MagicStyleEntity } from "../../../../Domain/Entities/magicStyleEntity";
import { EntityRepositoryInterface } from "../entityRepositoryInterface";
import { GeneralRepositoryInterface } from "../generalRepositoryInterface";

export interface StyleRepositoryInterface extends EntityRepositoryInterface{
    fetchMagicsFromStyle(): Promise<MagicEntity[]>;
    fetchMagesFromStyle(): Promise<MagicStyleEntity[]>;
    injectStylesInMagics(repository: GeneralRepositoryInterface, magics: MagicEntity[]): Promise<MagicEntity[]>;
}