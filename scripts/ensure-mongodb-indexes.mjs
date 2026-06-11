import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();
const dbName = process.env.MONGODB_DB?.trim();

if (!uri || !dbName) {
  console.error("MONGODB_URI and MONGODB_DB are required to create MongoDB indexes.");
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);

  await Promise.all([
    db.collection("blogs").createIndex({ slug: 1 }, { unique: true }),
    db.collection("blogs").createIndex({ status: 1 }),
    db.collection("blogs").createIndex({ publishedAt: -1 }),
    db.collection("submissions").createIndex({ status: 1 }),
    db.collection("submissions").createIndex({ createdAt: -1 })
  ]);

  console.log("MongoDB indexes are ready.");
} finally {
  await client.close();
}
