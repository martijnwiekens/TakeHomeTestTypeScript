import { data } from "../data/index.js";
import { byValue, byDate } from "sort-es";
import { IPage } from "../types.js";

interface IOutputListPages {
    items: Array<IPage>;
}

export default function listPages(parent: any, args: any, contextValue: any, info: any): IOutputListPages {
    // Need to name these params otherwise TypeScript gets mad
    // If I don't name then Apollo doesn't like it
    // To save time we just do this for now
    parent;
    contextValue;
    info;

    // Create an copy of the data
    let dataCopy: Array<IPage> = structuredClone(data);

    // Check if we have an hostname filter
    if (args.hostName) {
        dataCopy = dataCopy.filter(item => item.hostName === args.hostName);
    }

    // Check if we have a date filter
    if (args.startDate && args.endDate) {
        dataCopy = dataCopy.filter(item => item.dateCrawled >= args.startDate && item.dateCrawled <= args.endDate);
    } else if (args.startDate) {
        dataCopy = dataCopy.filter(item => item.dateCrawled >= args.startDate);
    } else if (args.endDate) {
        dataCopy = dataCopy.filter(item => item.dateCrawled <= args.endDate);
    }

    // Sort the data by Date
    dataCopy.sort(byValue((i) => i.dateCrawled, byDate()));

    // Return the data
    return { items: dataCopy };
}
