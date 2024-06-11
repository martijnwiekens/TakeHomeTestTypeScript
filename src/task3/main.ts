import { ApolloServer } from "@apollo/server";
import { buildSchema } from "graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import path from "path";
import listPages from "./resolvers/listitems.js";
import getPage from "./resolvers/getitem.js";
import addPage from "./resolvers/additem.js";

async function main(): Promise<void> {
    // We have the GraphQL schema in a schema.graphql file
    const typeDefs = buildSchema(
        fs.readFileSync(path.resolve("src/task3/schema.graphql").toString()).toString()
    );

    // Link the resolvers to the schema
    const resolvers = {
        Query: {
            listPages,
            getPage,
        },
        Mutation: {
            addPage
        }
    };

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

// Start the server
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
