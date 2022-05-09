import { DefaultEntity } from "../Entities/defaultEntity";
import { AlterationData } from "../../Utils/alterationData";

export default interface DefaultUsecases{
    getAll(): DefaultEntity[];
    getById(id: number): DefaultEntity;
    create(entity: DefaultEntity): object;
    delete(id: number): object;
    update(entity: DefaultEntity): object;
    updateProperty(id: number, propertyAlteration: AlterationData): object;
}