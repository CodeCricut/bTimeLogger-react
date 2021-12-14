import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoDb;

export const dbConnect = async () => {
    // Create and automatically start the in-memory DB const mongoDb
    mongoDb = await MongoMemoryServer.create();

    const uri = mongoDb.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };
    await mongoose.connect(uri, mongooseOpts);
};

export const resetDb = async () => {
    await mongoose.connection.dropDatabase();
};

export const dbDisconnect = async () => {
    await mongoose.connection.close();
    await mongoDb.stop();
};
