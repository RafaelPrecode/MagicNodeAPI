import { DefaultEntity } from "../../../Domain/Entities/defaultEntity";
import { GeneralRepositoryInterface } from "./generalRepositoryInterface";

export interface EntityRepositoryInterface{
    buildEntity(data: object): DefaultEntity;

    addNewEntity(repository: GeneralRepositoryInterface, entity: DefaultEntity): Promise<number>;
    deleteAnEntity(repository: GeneralRepositoryInterface, id: number): Promise<boolean>;
    updateAnEntity(repository: GeneralRepositoryInterface, entity: DefaultEntity): Promise<boolean>;

    getAllEntitysOfThisType(repository: GeneralRepositoryInterface): Promise<DefaultEntity[]>;
    getSomeEntityById(repository: GeneralRepositoryInterface, id: number): Promise<DefaultEntity>;

    getBasicDataAcessValue(): object;

    idAlreadyExist(repo: GeneralRepositoryInterface, id: number): Promise<boolean>;
}