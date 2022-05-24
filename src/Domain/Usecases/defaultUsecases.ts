import { DefaultEntity } from "../Entities/defaultEntity";
import { AlterationData } from "../Utils/alterationData";

export default interface DefaultUsecases{
    getAll(): Promise<DefaultEntity[]>;
    getById(id: number): Promise<DefaultEntity>;
    create(entity: DefaultEntity): Promise<object>;
    delete(id: number): Promise<object>;
    update(entity: DefaultEntity): Promise<object>;
    updateProperty(id: number, propertyAlteration: AlterationData): Promise<object>;
}