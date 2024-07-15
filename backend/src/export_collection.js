// export_collections.js

// const { execSync } = require('child_process');
// const { MongoClient } = require('mongodb');
import { execSync } from 'child_process';
import {MongoClient} from "mongodb"
import fs from "fs"
import path from 'path';
async function exportCollections(uri, database, outputDir) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(database);
    const collections = await db.listCollections().toArray();

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

    for (let collection of collections) {
      const collectionName = collection.name;
      console.log(`Exporting collection: ${collectionName}`);
      const command = `mongoexport --uri="${uri}" --collection="${collectionName}" --out="${outputDir}/${collectionName}.json"`;
      execSync(command);
    }

    console.log('All collections have been exported.');
  } finally {
    await client.close();
  }
}

// Replace with your MongoDB URI and database name
const uri = 'mongodb+srv://bhurtsahab786521:akhtar123@cluster0.byxbvz9.mongodb.net/apnaconnection';
const database = 'apnaconnection';
const outputDir = './backup';

exportCollections(uri, database, outputDir).catch(console.error);
