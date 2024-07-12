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
  userCollectionId: "668ba061001e142c8508",
  videoCollectionId: "668ba0a000188cba1a31",
  storageId: "668ba34f0034f85a95af",
};

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

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }

    
    );
    console.log("New User:", newUser);

    return newUser;
  } catch (error) {
    console.error('Create User Error:', error);
    throw new Error(error.message);
  }
}

export const  signIn = async(email, password) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async()=> {
  try{

    const CurrentAccount = await account.get();

    if(! CurrentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', CurrentAccount.$id)]

    );

   if(!currentUser) throw Error;

   return currentUser[0];

  }catch(error){
    console.error('Get Current User Error:', error);
    throw new Error(error.message);
  }
}