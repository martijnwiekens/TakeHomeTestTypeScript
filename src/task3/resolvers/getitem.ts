import { data } from "../data/index.js";
import { IPage } from "../types.js";

export default function getPage(parent: any, args: any, contextValue: any, info: any): IPage | null {
    // Need to name these params otherwise TypeScript gets mad
    // If I don't name then Apollo doesn't like it
    // To save time we just do this for now
    parent;
    contextValue;
    info;

    // Create an copy of the data
    let foundItem: IPage = null;

    // Check if we can find the item
    const pageId = args.pageId;
    if (pageId) {
        foundItem = data.find(item => item.id === pageId);
    }

    // Return the found item
    return foundItem;
}
