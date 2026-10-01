import type { NewResource, Resource, ResourceType } from "../../domain/entities/resource";
import { createResource } from "../../domain/entities/create-resource";
import type { IdGenerator } from "../../domain/ports/id-generator";
import type { ResourceRepository } from "../../domain/ports/resource-repository";

export class CreateResource {
  private readonly repository: ResourceRepository;
  private readonly idGenerator: IdGenerator;

  constructor(repository: ResourceRepository, idGenerator: IdGenerator) {
    this.repository = repository;
    this.idGenerator = idGenerator;
  }

  async execute(
    newResource: NewResource,
    type: ResourceType,
  ): Promise<Resource> {
    const resource = createResource(newResource, this.idGenerator.next(), type);

    return this.repository.add(resource);
  }
}
