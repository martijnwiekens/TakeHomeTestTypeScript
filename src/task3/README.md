# Task 3 - Create GraphQL server

by Martijn Wiekens - 2024-06-11

This solutions implemented an GraphQL server with Apollo.
This server has some example data that can be queried using the example client or using the queries included below.

## Installation & Starting

**Start the server**

1. `npm install`
2. `npm run devtask3`

**Run some tests**
Included is an test client that connects with the GraphQL server the execute the queries mentioned below.

1. `npm run clienttask3`

## Examples query

### Get item

```graphql
query GetPage($pageId: String!) {
  getPage(pageId: $pageId) {
    id
    url
    hostName
    dateCrawled
    description
  }
}
```

### List items

```graphql
query ListPages($nextToken: String) {
  listPages(nextToken: $nextToken) {
    id
    url
    dateCrawled
  }
}
```

### List items by hostname

```graphql
query ListPagesByHostname($hostName: String, $nextToken: String) {
  listPages(hostName: $string, nextToken: $nextToken) {
    id
    url
    dateCrawled
  }
}
```

### List items by date range

```graphql
query ListPagesByDate(
  $startDate: String
  $endDate: String
  $nextToken: String
) {
  listPages(startDate: $startDate, endDate: $endDate, nextToken: $nextToken) {
    id
    url
    dateCrawled
  }
}
```

### Add item

```graphql
query AddPage($item: InputPage) {
  addPage(item: $item) {
    id
  }
}
```
