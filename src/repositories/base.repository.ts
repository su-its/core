import type { PrismaClient } from "@prisma/client";
import type { IBaseRepository } from "./interfaces/base.repository.interface";

export abstract class BaseRepository<
  T,
  CreateInput,
  UpdateInput,
  FindManyArgs = unknown,
> implements IBaseRepository<T, CreateInput, UpdateInput, FindManyArgs>
{
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly modelName: string,
  ) {}

  // この段階では抽象メソッドとして定義
  abstract findById(id: string): Promise<T | null>;
  abstract create(data: CreateInput): Promise<T>;
  abstract update(id: string, data: UpdateInput): Promise<T>;
  abstract delete(id: string): Promise<T>;
  abstract findMany(params?: FindManyArgs): Promise<T[]>;
}
