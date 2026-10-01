import { DomainError } from "../errors/domain-error";
import type { NewResource, Resource, ResourceType } from "./resource";

export function createResource(
  newResource: NewResource,
  id: string,
  type: ResourceType,
): Resource {
  if (newResource.name.trim().length < 3) {
    throw new DomainError("El nombre debe tener al menos 3 caracteres.");
  }

  if (type === "image" && newResource.preview.trim() === "") {
    throw new DomainError("Una imagen necesita una URL de preview.");
  }

  return {
    ...newResource,
    id,
    type,
    uploadedAt: new Date().toISOString().slice(0, 10),
  };
}
