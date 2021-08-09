import 'source-map-support/register';

import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';

import cats from "../../cats";

const getCatById = async (e) => {
    const catId = e.pathParameters.id;
    const filteredCats = cats.filter(cat => cat.id == catId)

    if (filteredCats.length > 0) {
        return formatJSONResponse(
            {
                cats: filteredCats
            });
    } else if (filteredCats.length === 0) {
        return formatJSONResponse(
            {
                message: 'Cat not found',
                cats: []
            }
        )
    }
}

export const main = middyfy(getCatById);
