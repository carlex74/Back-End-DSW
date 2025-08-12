import { MikroORM } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import * as dotenv from 'dotenv';

dotenv.config();

const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, MONGO_DB_NAME } = process.env;

if (!MONGO_USER || !MONGO_PASS || !MONGO_CLUSTER || !MONGO_DB_NAME) {
  throw new Error('Missing environment variables for MongoDB connection');
}

const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: MONGO_DB_NAME,
  type: 'mongo',
  clientUrl: connectionString,
  highlighter: new MongoHighlighter(),
  debug: true,
  schemaGenerator: {
    // Delete in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator()
  //await generator.dropSchema()
  //await generator.createSchema()
  await generator.updateSchema()
};
