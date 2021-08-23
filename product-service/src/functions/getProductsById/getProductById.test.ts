import {getCatById} from "./handler";

test('getProductsById should return response with empty cats array and message with Cat not found', async () => {
    const event = {pathParameters: {id: 7}};
    const {body} = await getCatById(event);
    const result = JSON.parse(body);
    expect(result).toStrictEqual({message: "Cat not found", cats: []});
});

test('getProductsById should return response with only one product array', async () => {
    const event = {pathParameters: {id: 0}};
    const {body} = await getCatById(event);
    const result = JSON.parse(body);

    expect(result).toStrictEqual({
        cats: [{
            age: 1,
            breed: 'Abyssinian Cat',
            id: 0,
            imgLink: 'https://www.thesprucepets.com/thmb/7p0TopOHEHX3aQsdYzRdidbS0Lo=/2121x1414/filters:fill(auto,1)/GettyImages-165827729-efc11c02690f457a81ef6ccbfa8eb34d.jpg',
            name: 'Tom',
            price: 100
        }]
    });
});
