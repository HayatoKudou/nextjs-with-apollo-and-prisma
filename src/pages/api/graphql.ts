import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import path from "path";

const prisma = new PrismaClient();
const resolvers = {
  Query: {
    products: () => prisma.products.findMany(),
  }
};
const schemaPath = path.join(process.cwd(), "src/graphql/schema.gql");
const typeDefs = readFileSync(schemaPath, { encoding: "utf-8" });
const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
