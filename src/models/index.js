// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Contact } = initSchema(schema);

export {
  Todo,
  Contact
};