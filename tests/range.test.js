import {Range} from "../generators/range.js"
import {describe, test, expect} from "@jest/globals"

describe("Range", () => {
    test('should return range 1 - 5', () => {
        const range = new Range(1, 5)
        expect([...range]).toEqual([1,2,3,4,5])
    })
    test('should return range 2 - 4', () => {
        const range = new Range(2, 4)
        expect([...range]).toEqual([2,3,4])
    })
})