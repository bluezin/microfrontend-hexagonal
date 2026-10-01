import { CreateArticle } from "./application/use-cases/create-article";
import { CreateResource } from "./application/use-cases/create-resource";
import { GetArticles } from "./application/use-cases/get-articles";
import { GetArticleById } from "./application/use-cases/get-article-by-id";
import { GetResources } from "./application/use-cases/get-resources";
import { CryptoIdGenerator } from "./infrastructure/adapters/crypto-id-generator";
import { LocalStorageResourceRepository } from "./infrastructure/adapters/local-storage-resource-repository";
import { InMemoryArticleRepository } from "./infrastructure/adapters/in-memory-article-repository";

const articleRepository = new InMemoryArticleRepository();
const resourceRepository = new LocalStorageResourceRepository();
const idGenerator = new CryptoIdGenerator();

export const catalogContainer = {
  getArticles: new GetArticles(articleRepository),
  getArticleById: new GetArticleById(articleRepository),
  createArticle: new CreateArticle(articleRepository, idGenerator),
  getResources: new GetResources(resourceRepository),
  createResource: new CreateResource(resourceRepository, idGenerator),
};
