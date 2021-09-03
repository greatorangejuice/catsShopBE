import * as Yup from 'yup';

export interface IToy {
    id: string,
    title: string,
    description: string,
    price: number,
    count: number,
    imglink: string
}


export const ToySchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string(),
    price: Yup.number().required(),
    count: Yup.number().required(),
    imglink: Yup.string().required(),
});
