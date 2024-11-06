import type { PrismaClient } from "@prisma/client";

export abstract class BaseRepository<
  T,
  CreateInput,
  UpdateInput,
  FindManyArgs,
> {
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly modelName: string,
  ) {}

  abstract findById(id: string): Promise<T | null>;
  abstract create(data: CreateInput): Promise<T>;
  abstract update(id: string, data: UpdateInput): Promise<T>;
  abstract delete(id: string): Promise<T>;
  abstract findMany(params?: FindManyArgs): Promise<T[]>;
}
