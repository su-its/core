import { PrismaClient } from "@prisma/client";
import { createRepositories } from "./repositories";
import { createServices } from "./services";

export * from "./repositories";
export * from "./services";

export const createClient = () => {
  const prisma = new PrismaClient();
  const repositories = createRepositories(prisma);
  const services = createServices(repositories);

  return {
    prisma,
    repositories,
    services,
  };
};

export type Client = ReturnType<typeof createClient>;
