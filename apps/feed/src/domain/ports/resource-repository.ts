import type { Resource } from "../entities/resource";

export interface ResourceRepository {
  getAll(): Promise<Resource[]>;
  getById(id: string): Promise<Resource | null>;
  add(resource: Resource): Promise<Resource>;
}
