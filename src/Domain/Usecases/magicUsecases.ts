import { MageEntity } from "../Entities/mageEntity";
import { MagicEntity } from "../Entities/magicEntity";
import DefaultUsecases from "./defaultUsecases";

export default interface MagicUsecases extends DefaultUsecases{
    getUsersFromMagic(magicId: number): Promise<MageEntity[]>;
    getAllMagicFromStyle(styleId: number): Promise<MagicEntity[]>;
}