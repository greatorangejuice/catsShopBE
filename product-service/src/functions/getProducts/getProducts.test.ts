import {getCats} from "./handler";

test('getCats objects should include keys', async () => {
    const {body} = await getCats();
    const result = JSON.parse(body);
    expect(Object.keys(result.cats[0]).toString()).toBe("name,age,breed,price,id,imgLink")
});
