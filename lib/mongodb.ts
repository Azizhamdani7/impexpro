import { MongoClient, type Collection } from "mongodb";
import type { Blog } from "@/lib/blog-shared";
import type { ContactSubmission } from "@/lib/submissions";

type GlobalMongo = typeof globalThis & {
  _impexMongoClient?: MongoClient;
  _impexMongoClientPromise?: Promise<MongoClient>;
  _impexMongoIndexesReady?: Promise<void>;
};

const globalMongo = globalThis as GlobalMongo;

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required. Set ${name} in Vercel Environment Variables.`);
  }
  return value;
}

export async function getMongoClient() {
  const uri = requiredEnv("MONGODB_URI");

  if (!globalMongo._impexMongoClientPromise) {
    globalMongo._impexMongoClient = new MongoClient(uri);
    globalMongo._impexMongoClientPromise = globalMongo._impexMongoClient.connect();
  }
  return globalMongo._impexMongoClientPromise;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(requiredEnv("MONGODB_DB"));
}

export async function getBlogsCollection(): Promise<Collection<Blog>> {
  const db = await getMongoDb();
  return db.collection<Blog>("blogs");
}

export async function getSubmissionsCollection(): Promise<Collection<ContactSubmission>> {
  const db = await getMongoDb();
  return db.collection<ContactSubmission>("submissions");
}

export async function ensureMongoIndexes() {
  if (globalMongo._impexMongoIndexesReady) return globalMongo._impexMongoIndexesReady;

  globalMongo._impexMongoIndexesReady = (async () => {
    const blogs = await getBlogsCollection();
    const submissions = await getSubmissionsCollection();

    await Promise.all([
      blogs.createIndex({ slug: 1 }, { unique: true }),
      blogs.createIndex({ status: 1 }),
      blogs.createIndex({ publishedAt: -1 }),
      submissions.createIndex({ status: 1 }),
      submissions.createIndex({ createdAt: -1 })
    ]);
  })();

  return globalMongo._impexMongoIndexesReady;
}
