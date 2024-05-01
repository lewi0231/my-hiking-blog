import { type SchemaTypeDefinition } from "sanity";

import author from "./schemaTypes/author";
import blockContent from "./schemaTypes/blockContent";
import category from "./schemaTypes/category";
import comment from "./schemaTypes/comment";
import like from "./schemaTypes/like";
import photo from "./schemaTypes/photo";
import post from "./schemaTypes/post";
import { tag } from "./schemaTypes/tag";
import user from "./schemaTypes/user";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    blockContent,
    tag,
    like,
    comment,
    user,
    photo,
  ],
};
