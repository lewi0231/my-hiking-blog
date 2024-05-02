import { client } from "@/sanity/lib/client";

export const getUserByEmail = async (email: string) => {
  try {
    const query = '*[_type == "user" && email == $email]';
    const params = { email };
    const userArray = await client.fetch(query, params);
    return userArray[0];
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const query = '*[_type == "user" && _id == $id]';
    const params = { id };
    const userArray = await client.fetch(query, params);
    return userArray[0];
  } catch (error) {
    return null;
  }
};
