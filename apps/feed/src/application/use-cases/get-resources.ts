import type { Resource } from "../../domain/entities/resource";
import type { ResourceRepository } from "../../domain/ports/resource-repository";

export class GetResources {
  private readonly repository: ResourceRepository;

  constructor(repository: ResourceRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Resource[]> {
    const resources = await this.repository.getAll();

    return [...resources].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  }
}
