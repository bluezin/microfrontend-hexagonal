import type { Resource } from "../../domain/entities/resource";
import type { ResourceRepository } from "../../domain/ports/resource-repository";
import { seedResources } from "../data/seed-resources";
import { readCollection, writeCollection } from "../persistence/local-db";

const KEY = "feed:resources";

export class LocalStorageResourceRepository implements ResourceRepository {
  async getAll(): Promise<Resource[]> {
    return readCollection<Resource>(KEY, seedResources);
  }

  async getById(id: string): Promise<Resource | null> {
    const all = await this.getAll();

    return all.find((resource) => resource.id === id) ?? null;
  }

  async add(resource: Resource): Promise<Resource> {
    const all = await this.getAll();
    writeCollection(KEY, [...all, resource]);

    return resource;
  }
}
