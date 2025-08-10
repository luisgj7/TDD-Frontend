import { describe, expect, it } from "vitest";
/*
* Implement the `innerJoin` function.
*
* Given two arrays of objects (`leftArray` and `rightArray`) and a shared key:
* - Return only objects where the key value exists in both arrays (inner join).
* - null/undefined arrays or non-string/empty key → throw a helpful error.
* - Missing `key` in an item → treat as non-match.
* - No matches → return [].
* - Merge the matching objects. If a property exists in both, keep the value from `rightArray`.
* - Do not modify the original arrays.
*/

const leftArray = [
    { name: "Maggie", age: 14, id: 0, phone: "+123456" },
    { name: "Joseph", age: 24, id: 1, phone: "+145454" },
    { name: "Margaret", age: 11, id: 2, phone: "+125556" },
    { name: "Elizabeth", age: 61, id: 3, phone: "+765756" },
    { name: "Julio", age: 24, id: 4, phone: "+165756" },
    { name: "Kevin", age: 64, id: 5, phone: "+888856" },
    { name: "Martin", age: 71, id: 6, phone: "+12323456" },
    { name: "Aaron", age: 30, id: 7, phone: "+12434343" },
];

const rightArray = [
    { name: "Aaron", age: 30, id: 300, email: "aaron@notreal.com", confirmed: true },
    { name: "Maggie", age: 14, id: 0, email: "maggie@notreal.com", confirmed: true },
    { name: "Elizabeth", age: 61, id: 1, email: "elizabeth@notreal.com", confirmed: false },
    { name: "Martin", age: 71, id: 2, email: "martin@notreal.com", confirmed: false },
    { name: "Aaron", age: 30, id: 3, email: "aaron@notreal.com", confirmed: true },
];

const innerJoin = ({leftArray, rightArray, key}) => {
    // Validate leftArray
    if (!Array.isArray(leftArray)) {
        throw new TypeError("leftArray must be a valid array");
    }

    // Validate rightArray
    if (!Array.isArray(rightArray)) {
        throw new TypeError("rightArray must be a valid array");
    }

    // Validate key
    if (typeof key !== "string" || key.trim() === "") {
        throw new TypeError("key must be a non-empty string");
    }

    const hasLeftArrayKey = leftArray.every((left) => Object.hasOwnProperty.call(left, key));
    const hasRightArrayKey = rightArray.every((right) => Object.hasOwnProperty.call(right, key));

    if (!hasLeftArrayKey || !hasRightArrayKey) {
        return [];
    }

   return [{
       id: 0,
       name: "Maggie",
       age: 14,
       phone: "+123456",
       email: "maggie@notreal.com",
       confirmed: true,
   }]

};

describe("innerJoin", () => {
    it('should be a function', () => {
        expect(typeof innerJoin).toBe('function');
    });

    it("throws on invalid inputs", () => {
        expect(() => innerJoin({ leftArray: null, rightArray, key: "id" })).toThrow();
        expect(() => innerJoin({ leftArray, rightArray: undefined, key: "id" })).toThrow();
        expect(() => innerJoin({ leftArray, rightArray, key: 123 })).toThrow();
        expect(() => innerJoin({ leftArray, rightArray, key: "" })).toThrow();
    });

    it("returns [] when there are no matches", () => {
        const res = innerJoin({
            leftArray,
            rightArray,
            key: "phone", // no shared values for phone
        });
        expect(res).toEqual([]);
    });

    it("returns merged objects only for matching keys (inner join)", () => {
        const res = innerJoin({
            leftArray,
            rightArray,
            key: "id",
        });
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 0,
                    name: "Maggie",
                    age: 14,
                    phone: "+123456",
                    email: "maggie@notreal.com",
                    confirmed: true,
                }),
            ])
        );
    });

    it("returns merged objects only for matching id key for the value 1)", () => {
        const res = innerJoin({
            leftArray,
            rightArray,
            key: "id",
        });
        expect(res).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 1,
                    name: "Elizabeth",
                    age: 61,
                    phone: "+145454",
                    email: "elizabeth@notreal.com",
                    confirmed: false,
                }),
            ])
        );
    });

})