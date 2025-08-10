/*
* Write a function that, given a number:
*  - Returns "fizz" if it is a multiple of 3
*  - Returns "buzz" if it is a multiple of 5
*  - Returns "fizzbuzz" if it is a multiple of both 3 and 5
*  - Returns the number itself if it is not a multiple of either
*/

// Refactored version after completing the FizzBuzz requirement using TDD
export const fizzbuzz = (number) => {
    if (typeof number !== 'number' || Number.isNaN(number)) {
        throw new TypeError("parameter provided must be a number");
    }

    const multiplies = {
        3: 'fizz',
        5: 'buzz'
    };

    const output = Object.entries(multiplies)
        .reduce((acc, [multiply, word]) =>
            number % multiply === 0 ? acc + word : acc, ''
        );

    return output || number;
};

// First version using TDD
/*
export const fizzbuzz = (number) => {
    if (typeof number !== 'number') throw new Error("parameter provided must be a number");
    if (Number.isNaN(number)) throw new Error("parameter provided must be a number");

    if (number % 15 === 0) return "fizzbuzz";
    if (number % 3 === 0) return "fizz";
    if (number % 5 === 0) return "buzz";

    return number;
}
*/