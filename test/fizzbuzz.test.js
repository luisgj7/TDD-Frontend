import { describe, expect, it } from "vitest";
import { fizzbuzz } from "../src/fizzbuzz";

export const fizzbuzz = (number) => {
    if (typeof number !== 'number') throw new Error("parameter provided must be a number");
    if (Number.isNaN(number)) throw new Error("parameter provided must be a number");

    if (number % 15 === 0) return "fizzbuzz";
    if (number % 3 === 0) return "fizz";
    if (number % 5 === 0) return "buzz";

    return number;
}

describe("fizzbuzz", () => {
    // This is redundant cuz it has been covered for next tests
    /*it('should be a function', () => {
        expect(typeof fizzbuzz).toBe('function');
    });*/

    it('should throw if not number is provided as parameter', () => {
        expect(() => fizzbuzz()).toThrow();
    });

    it('should throw a specific error message if not a number is provided', () => {
        expect(() => fizzbuzz()).toThrow('parameter provided must be a number');
    });

    it('should throw a specific error message if not a number is provided', () => {
        expect(() => fizzbuzz(NaN)).toThrow('parameter provided must be a number');
    });

    it('should return 1 if parameter provided is 1', () => {
        expect(fizzbuzz(1)).toBe(1);
    });

    it('should return 2 if parameter provided is 2', () => {
        expect(fizzbuzz(1)).toBe(1);
    });

    it('should fizz if number provided is 3', () => {
        expect(fizzbuzz(3)).toBe("fizz");
    });

    it('should fizz if number provided is multiple of 3', () => {
        expect(fizzbuzz(3)).toBe("fizz");
        expect(fizzbuzz(6)).toBe("fizz");
        expect(fizzbuzz(9)).toBe("fizz");
    });

    it('should buzz if number provided is multiple of 5', () => {
        expect(fizzbuzz(5)).toBe("buzz");
        expect(fizzbuzz(10)).toBe("buzz");
        expect(fizzbuzz(20)).toBe("buzz");
    });

    it('should buzz if number provided is multiple of 15', () => {
        expect(fizzbuzz(15)).toBe("fizzbuzz");
    });

});