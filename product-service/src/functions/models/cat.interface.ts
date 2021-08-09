import {EBreed} from "@functions/models/breed.interface";

export interface ICat {
    name: string;
    breed: EBreed,
    age: number;
    id: number;
    price: number;
    imgLink?: string;
}
