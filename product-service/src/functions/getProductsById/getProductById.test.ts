const sum = (a = 0, b = 0) => {
    return a + b
}

import {getCatById} from "@functions/index";

test('basic', () => {
    expect(sum()).toBe(0);
});
test('basic again', () => {
    expect(sum(1, 2)).toBe(3);
});


test('get cat with id 1', () => {
    // @ts-ignore
    expect(getCatById().toBe(Object as any))
})
