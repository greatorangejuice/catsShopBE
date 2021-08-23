import 'source-map-support/register';

import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {ICat} from "@functions/models/cat.interface";
import {EBreed} from "@functions/models/breed.interface";

const cats: ICat[] = [
    {
        name: 'Tom',
        age: 1,
        breed: EBreed.AbyssinianCat,
        price: 100,
        id: 0,
        imgLink: 'https://www.thesprucepets.com/thmb/7p0TopOHEHX3aQsdYzRdidbS0Lo=/2121x1414/filters:fill(auto,1)/GettyImages-165827729-efc11c02690f457a81ef6ccbfa8eb34d.jpg'
    },
    {
        name: 'Jacky',
        age: 1.5,
        breed: EBreed.AmericanCurlCatBreed,
        price: 110,
        id: 1,
        imgLink: 'https://www.hospitalveterinariglories.com/wp-content/uploads/2021/02/17-02-21-Descubre-la-espectacular-raza-de-gato-American-Curl-676x451.jpg'
    },
    {
        name: 'Jacky',
        age: 1.5,
        breed: EBreed.AmericanBobtailCatBreed,
        price: 100,
        id: 2,
        imgLink: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/American-Bobtail-01.jpg?bust=1539031086&width=355'
    },
]

export const getCats = async () => {
    return formatJSONResponse(
        {
            cats,
        });
}

export const main = middyfy(getCats);
