import { MagicEntity } from "../Entities/magicEntity";
import { MagicStyleEntity } from "../Entities/magicStyleEntity";
import DefaultUsecases from "./defaultUsecases";

export default interface MageUsecases extends DefaultUsecases{
    getMagicsFromMage(id: number): Promise<MagicEntity[]>;
    getStylesOfMage(id: number): Promise<MagicStyleEntity[]>;
}