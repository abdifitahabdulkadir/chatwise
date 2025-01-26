import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error("MONGODB  is not defined");

interface MongodbI {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongodbConnection: MongodbI;
}

let cached = global.mongodbConnection;

if (!cached)
  cached = global.mongodbConnection = { connection: null, promise: null };

export default async function dbConnect(): Promise<Mongoose> {
  if (cached.connection) return cached.connection;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI.trim(), {
        dbName: "thinksphere",
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  cached.connection = await cached.promise;
  return cached.connection;
}
