import { execSync } from 'child_process';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

async function importCollections(uri, inputDir) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const files = fs.readdirSync(inputDir);

    for (let file of files) {
      if (path.extname(file) === '.json') {
        const collectionName = path.basename(file, '.json');
        console.log(`Importing collection: ${collectionName}`);
        const command = `mongoimport --uri="${uri}" --collection="${collectionName}" --file="${path.join(inputDir, file)}"`;
        execSync(command);
      }
    }

    console.log('All collections have been imported.');
  } finally {
    await client.close();
  }
}

// Replace <password> with the actual password for the MongoDB user
const uri = 'mongodb+srv://arsalana:Digitechinfra%40123@cluster0.klad1ej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const inputDir = './backup';

importCollections(uri, inputDir).catch(console.error);
