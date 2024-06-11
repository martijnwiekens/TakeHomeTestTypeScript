/**
 * A utility function that accepts an array of objects and returns a deep copy of
 * the input array. The input objects may contain nested objects, arrays, or primitive data types.
 * @param source The array of objects to be copied.
 * 
 * @returns A deep copy of the input array.
 */
export default function copy(source: Array<any>): Array<any> {
    // Create an space for the output
    let output: Array<any> = [];

    // Walk through each of the items in the source array
    try {
        source.forEach((item: any) => {
            // Create an copy of this item
            const newCopy = _copy(item);
            output.push(newCopy);
        });
    } catch (error) {
        // Do nothing
    }

    return output;
}

export function _copy(input: any): any {
    if (input === null) {
        // Copy the null
        return null;

    } else if (typeof input === "string") {
        // Copy the text
        return `${input}`;

    } else if (typeof input === "number") {
        // Copy the number
        return input;

    } else if (typeof input === "boolean") {
        // Copy the boolean
        return input;

    } else if (Array.isArray(input)) {
        // Copy the array
        return copy(input);

    } else if (typeof input === "object") {
        // Copy the object
        const output: any = {};
        Object.keys(input).forEach((key) => {
            output[key] = _copy(input[key]);
        });
        return output;
    }

    // We don't have support for this type, make it empty
    return null;
}
