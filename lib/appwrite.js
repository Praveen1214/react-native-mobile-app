import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  Platform: "com.praveen.aura",
  projectId: "668b9e5b000d89fc7ec6",
  databaseId: "668ba037002577981234",
  userCollectionId: "6698b2a9003d6efd6326",
  videoCollectionId: "6698b2d0000e502b2853",
  storageId: "668ba34f0034f85a95af",
};

const {
  endpoint,
  Platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;


// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.Platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error);
  }
}


// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
  

    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export const getCurrentUser = async () => {
  try {

      const currentAccount = await account.get();

      if (!currentAccount) throw Error;

      const currentUser = await databases.listDocuments(
          config.databaseId,
          config.userCollectionId,
          [Query.equal('accountId', currentAccount.$id)]
      )

      if (!currentUser) throw Error;

      return currentUser.documents[0];

  } catch (error) {
      console.log(error);
  }
}


// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getLatesPosts = async () => {
  try {
      const posts = await databases.listDocuments(
          databaseId,
          videoCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(7)]
      )
      return posts.documents;

  } catch (error) {
      throw new Error(error);
  }
}


export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId

    );

    

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
