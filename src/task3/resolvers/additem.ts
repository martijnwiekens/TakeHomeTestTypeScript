import { v4 as uuidv4 } from 'uuid';
import { data } from "../data/index.js";
import { IPage } from "../types.js";

export default function addPage(parent: any, args: any, contextValue: any, info: any): IPage | null {
    // Need to name these params otherwise TypeScript gets mad
    // If I don't name then Apollo doesn't like it
    // To save time we just do this for now
    parent;
    contextValue;
    info;

    // Find the input data
    const inputData: IPage = args.item;

    // Add an new ID
    inputData.id = uuidv4();

    // Find the hostname of the url
    inputData.hostName = new URL(inputData.url).hostname;

    // Add the date crawled as today
    inputData.dateCrawled = new Date().toISOString();

    // Add the input data to the data
    data.push(inputData);

    // Return the data
    return inputData;
}
