import { MagicEntity } from "../Entities/magicEntity";
import { MagicStyleEntity } from "../Entities/magicStyleEntity";
import DefaultUsecases from "./defaultUsecases";

export default interface MageUsecases extends DefaultUsecases{
    getMagicsFromMage(id: number): MagicEntity[];
    getStylesOfMage(id: number): MagicStyleEntity[];
}