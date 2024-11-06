export interface IBaseRepository<T, CreateInput, UpdateInput, FindManyArgs> {
  findById(id: string): Promise<T | null>;
  create(data: CreateInput): Promise<T>;
  update(id: string, data: UpdateInput): Promise<T>;
  delete(id: string): Promise<T>;
  findMany(params?: FindManyArgs): Promise<T[]>;
}
