export interface IBaseService<T, CreateDTO, UpdateDTO> {
  findById(id: string): Promise<T | null>;
  create(data: CreateDTO): Promise<T>;
  update(id: string, data: UpdateDTO): Promise<T>;
  delete(id: string): Promise<T>;
  findMany(): Promise<T[]>;
}
