import type { IBaseService } from "./interfaces/base.service.interface";
import type { IBaseRepository } from "../repositories/interfaces/base.repository.interface";

export abstract class BaseService<
  T, // T: エンティティの型
  CreateDTO, // CreateDTO: エンティティの作成時に必要なデータの型
  UpdateDTO, // UpdateDTO: エンティティの更新時に必要なデータの型
  FindManyArgs, // FindManyArgs: 検索条件の型
  CreateInput = CreateDTO, // CreateInput: リポジトリの作成入力型
  UpdateInput = UpdateDTO, // UpdateInput: リポジトリの更新入力型
  // R: リポジトリの型
  R extends IBaseRepository<
    T,
    CreateInput,
    UpdateInput,
    FindManyArgs
  > = IBaseRepository<T, CreateInput, UpdateInput, FindManyArgs>,
> implements IBaseService<T, CreateDTO, UpdateDTO>
{
  constructor(protected readonly repository: R) {}

  async findById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  abstract create(data: CreateDTO): Promise<T>;
  abstract update(id: string, data: UpdateDTO): Promise<T>;

  async delete(id: string): Promise<T> {
    return this.repository.delete(id);
  }

  async findMany(): Promise<T[]> {
    return this.repository.findMany();
  }
}
