export type ResourceType = "image" | "file";

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: ResourceType;
  size: number;
  preview: string;
  uploadedAt: string;
}

export type NewResource = Omit<Resource, "id" | "uploadedAt" | "type">;
