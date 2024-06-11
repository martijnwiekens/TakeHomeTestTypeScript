import copy, { _copy } from '../src/task1.js';

describe('copy function', () => {
    // Copy an empty array
    it('should copy an empty array', () => {
        const arr = [];
        const copied = _copy(arr);
        expect(copied).toEqual(arr);
        expect(copied).not.toBe(arr);
        expect(copied).toHaveLength(0);
    });

    // Copy an array
    it('should have an empty array on just string', () => {
        // Try just passing a string
        const arr = [];
        const copied = copy("hello" as any);
        expect(copied).toEqual(arr);
        expect(copied).not.toBe(arr);
        expect(copied).toHaveLength(0);
    });

    it('should have an empty array on just number', () => {
        // Try just passing a number
        const arr = [];
        const copied1 = copy(0 as any);
        expect(copied1).toEqual(arr);
        expect(copied1).not.toBe(arr);
        expect(copied1).toHaveLength(0);
    });

    it('should have an empty array on just boolean', () => {
        // Try just passing a boolean
        const arr = [];
        const copied2 = copy(false as any);
        expect(copied2).toEqual(arr);
        expect(copied2).not.toBe(arr);
        expect(copied2).toHaveLength(0);
    });

    it('should have an empty array on just null', () => {
        // Try just passing an null
        const arr = [];
        const copied3 = copy(null);
        expect(copied3).toEqual(arr);
        expect(copied3).not.toBe(arr);
        expect(copied3).toHaveLength(0);
    });

    // Copy an string in an array
    it('should copy an string in an array', () => {
        const input = ["hello"];
        const copied = copy(input);
        expect(copied).toHaveLength(1);
        expect(copied).not.toBe(input);
        expect(copied[0]).toEqual("hello");
    });
});

describe('_copy function', () => {
    // Copy an empty array
    it('should copy an empty array', () => {
        const arr = [];
        const copied = _copy(arr);
        expect(copied).toEqual(arr);
        expect(copied).not.toBe(arr);
        expect(copied).toHaveLength(0);
    });

    // Copy an string
    it('should copy an string', () => {
        let input = "hello";
        const copied = _copy(input);
        expect(copied).toEqual(input);

        // Check if it is a reference, this should not change the copied
        input = "bye";
        expect(copied).not.toBe(input);
    });

    // Copy an number
    it('should copy an number', () => {
        let input = 0;
        const copied = _copy(input);
        expect(copied).toEqual(input);

        // Check if it is a reference, this should not change the copied
        input = 1;
        expect(copied).not.toBe(input);
    });

    // Copy an boolean
    it('should copy an boolean', () => {
        let input = false;
        const copied = _copy(input);
        expect(copied).toEqual(input);

        // Check if it is a reference, this should not change the copied
        input = true;
        expect(copied).not.toBe(input);
    });

    // Copy an null
    it('should copy an null', () => {
        let input = null;
        const copied = _copy(input);
        expect(copied).toEqual(input);

        // Check if it is a reference, this should not change the copied
        input = undefined;
        expect(copied).not.toBe(input);
    });

    // Copy an array
    it('should copy an array', () => {
        let input = ["hello"];
        const copied = _copy(input);
        expect(copied).toHaveLength(1);
        expect(copied).not.toBe(input);
        expect(copied[0]).toEqual("hello");

        // Check if it is a reference, this should not change the copied
        input = ["bye"];
        expect(copied).not.toBe(input);
    });

    // Copy an object
    it('should copy an object', () => {
        let input: any = { hello: "world" };
        const copied = _copy(input);
        expect(copied).toEqual(input);
        expect(copied).not.toBe(input);
        expect(copied.hello).toEqual("world");

        // Check if it is a reference, this should not change the copied
        input = { bye: "world" };
        expect(copied).not.toBe(input);
    });

    // Check nested objects
    it('should handle arrays with objects and nested structures', () => {
        let input = [{ a: { b: 2 } }, [{ c: 3 }]];
        const output = _copy(input);
        expect(output).toEqual(input);
        expect(output).not.toBe(input);
        expect(output[0]).not.toBe(input[0]);
        expect(output[0].a).not.toBe((input[0] as any).a);
        expect(output[1]).not.toBe(input[1]);
        expect(output[1][0]).not.toBe(input[1][0]);

        // Check if it is a reference, this should not change the copied
        input = [{ a: { b: 3 } }, [{ c: 4 }]];
        expect(output).not.toBe(input);
        expect(output[0]).not.toBe(input[0]);
        expect(output[0].a).not.toBe((input[0] as any).a);
        expect(output[1]).not.toBe(input[1]);
        expect(output[1][0]).not.toBe(input[1][0]);
    });
});
