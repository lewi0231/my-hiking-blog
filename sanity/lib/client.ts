import { createClient } from "next-sanity";

import { apiKey, apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: apiKey,
});
