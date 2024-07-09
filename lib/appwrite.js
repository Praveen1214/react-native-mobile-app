import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import SignIn from "../app/(auth)/sign-up";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  Platform: "com.praveen.aura",
  projectId: "668b9e5b000d89fc7ec6",
  databaseId: "668ba037002577981234",
  userCollectionId: "668ba061001e142c8508",
  vedioCollectionId: "668ba0a000188cba1a31",
  storageId: "668ba34f0034f85a95af",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.Platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databas = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error("Account not created");
    }

    const avatarUrl = avatars.getInitials(username);

    await SignIn(email, password);

    const newUser = await databas.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
