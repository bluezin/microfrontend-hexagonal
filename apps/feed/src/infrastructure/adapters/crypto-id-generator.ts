import type { IdGenerator } from "../../domain/ports/id-generator";

export class CryptoIdGenerator implements IdGenerator {
  next(): string {
    return crypto.randomUUID();
  }
}
