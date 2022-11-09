import { PrimaryGeneratedColumn } from "typeorm";

/**
 * This class is the parent class for all models that contain the specified columns
 */
export abstract class BaseModel {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;
}
