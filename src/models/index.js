// @ts-nocheck
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Contacts } = initSchema(schema);

export {
  Contacts
};