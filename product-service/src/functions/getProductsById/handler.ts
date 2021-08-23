import 'source-map-support/register';

import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';

import cats from "../../cats";

export const getCatById = async (e) => {
    try {
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
                },
                404
            )
        }
    } catch (e) {
        return formatJSONResponse(
            {
                message: e.message,
            },
            400
        )
    }
}

export const main = middyfy(getCatById);
