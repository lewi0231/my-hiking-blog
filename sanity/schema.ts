import { type SchemaTypeDefinition } from "sanity";

import author from "./schemaTypes/author";
import blockContent from "./schemaTypes/blockContent";
import category from "./schemaTypes/category";
import photo from "./schemaTypes/photo";
import post from "./schemaTypes/post";
import { tag } from "./schemaTypes/tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, tag, photo],
};
