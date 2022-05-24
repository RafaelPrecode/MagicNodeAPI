import { MagicEntity } from "../Entities/magicEntity";
import DefaultUsecases from "./defaultUsecases";

export default interface MagicStyleUsecases extends DefaultUsecases{
    insertStylesInMagic(magic: MagicEntity[]): Promise<MagicEntity[]>;
}