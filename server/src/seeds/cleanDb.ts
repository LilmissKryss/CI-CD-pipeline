import models from "../models/index.js";
import db from "../config/connection.js";

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Check if the model exists before trying to access it
    if (models[modelName] && models[modelName].db && models[modelName].db.db) {
      let modelExists = await models[modelName].db.db
        .listCollections({
          name: collectionName,
        })
        .toArray();

      if (modelExists.length) {
        await db.dropCollection(collectionName);
      }
    } else {
      console.warn(`Model ${modelName} not found in models.`);
    }
  } catch (err) {
    console.error("Error in cleanDb:", err);
    throw err;
  }
};
