import axios from "axios";

async function doRequest(query: string, variables: any): Promise<any> {
    const result = await axios(
        {
            method: "post",
            url: "http://localhost:4000/graphql",
            data: {
                query: query,
                variables: variables,
            },
        }
    );
    if (result.data.errors) {
        console.error(JSON.stringify(result.data.errors));
    }
    console.log(JSON.stringify(result.data.data));
    console.log("");
    return result.data.data;
}

// Lets start testing
console.log("------ START TESTING ------");

// Query a single page
console.log("* Testing -> GetPage query");
await doRequest(
    `
        query GetPage($pageId: String!) {
            getPage(pageId: $pageId) {
                id
                url
                hostName
                dateCrawled
                description
            }
        }
    `,
    {
        pageId: "3b0f7eaf-6768-4d78-b1d7-e87dc1f6e2b5",
    },
);

// Query multiple pages
console.log("* Testing -> ListPages query");
await doRequest(
    `
        query ListPages($nextToken: String) {
            listPages(nextToken: $nextToken) {
                items {
                    id
                    url
                    dateCrawled
                }
            }
        }
    `, {});

// Query multiple pages by hostname
console.log("* Testing -> ListPagesByHostName query");
await doRequest(
    `
        query ListPagesByHostname($hostName: String, $nextToken: String) {
        listPages(hostName: $hostName, nextToken: $nextToken) {
            items {
                id
                url
                dateCrawled
            }
        }
    }
`, { hostName: "example1.com" });

// Query multiple pages by date
console.log("* Testing -> ListPagesByDate query");
await doRequest(
    `
        query ListPagesByDate($startDate: String, $endDate: String, $nextToken: String) {
            listPages(startDate: $startDate, endDate: $endDate, nextToken: $nextToken) {
                items {
                    id
                    url
                    dateCrawled
                }
            }
        }
`, { "startDate": "2024-05-14T00:00:00.000Z", "endDate": "2024-05-15T00:00:00.000Z" });

// Query multiple pages by date
console.log("* Testing -> AddPage mutation");
const result = await doRequest(
    `
        mutation AddPage($item: InputPage) {
            addPage(item: $item) {
                id
            }
        }
`, {
    item: {
        url: "https://www.google.com",
        pageTitle: "Google",
        description: "This is a description"
    }
}
);

// Query a single page
console.log("* Testing -> GetPage query on AddPage mutation");
await doRequest(
    `
        query GetPage($pageId: String!) {
            getPage(pageId: $pageId) {
                id
                url
                hostName
                dateCrawled
                description
            }
        }
    `,
    {
        pageId: result.addPage.id,
    },
);
