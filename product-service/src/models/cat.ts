import * as Yup from 'yup';

export interface ICat {
    id?: string,
    description?: string,
    title: string,
    price: number,
    imglink: string,
    breedid: number,
    count: number,
    birthday: string,
}

export const CatSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string(),
    price: Yup.number().required(),
    count: Yup.number().required(),
    imglink: Yup.string().required(),
    breedid: Yup.number(),
});
