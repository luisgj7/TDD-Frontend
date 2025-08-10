import { describe, expect, it } from "vitest";
import { innerJoin, leftArray, rightArray } from "../src/inner-join";


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

    it("ignores items missing the join key", () => {
        const l = [{ id: 1, a: 1 }, { a: 2 }]; // second item missing id
        const r = [{ id: 1, b: 1 }];
        const res = innerJoin({ leftArray: l, rightArray: r, key: "id" });
        expect(res).toEqual([{ id: 1, a: 1, b: 1 }]);
    });
});