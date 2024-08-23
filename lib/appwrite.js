import { Account, Avatars, Databases, Client, ID, Query } from 'react-native-appwrite';

// Configuration
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.supracarer.supracarerapp",
    projectId: "66be9f0f00360ff0a7a9",
    databaseId: "66bea2af000036e5a6aa",
    userCollectionId: "66bea3d00024cc394c73",
    messageCollectionId: "66bea3130003a304a0bf",
    storageId: "66beb529001f0fb26d2f",
    profileImgCollectionId: "66c7254c0022cb7159a0",
};

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform); // Your application ID or bundle ID

// Initialize Account service
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a new user
export const createUser = async (email, password, name, role) => {
    try {
        console.log('Creating user with:', { email, password, name }); // Log inputs to check them
        
        // Create the user in the authentication system
        const user = await account.create(ID.unique(), email, password, name);

        // Log the user in to create a session immediately
        await loginUser(email, password); // Creates a session for the user


        // Update the user preferences to include the role
        await account.updatePrefs({
            role: role,
        });

        // Specify the URL to which the user will be redirected after email verification
        const redirectUrl = 'https://cloud.appwrite.io/v1/email-verify';  // Replace with your actual URL


        // Send the verification email
        await account.createVerification(redirectUrl);

        
        // Automatically generate a custom avatar URL
        const avatarUrl = avatars.getInitials(name); 

        // Create a new document in the 'users' collection in the database
        const newUserDocument = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email,
                name,
                avatar: avatarUrl,
                roles: role
            }
        );

        console.log('User document created successfully in the database:', newUserDocument);
        return newUserDocument;

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};



// Function to log in a user
export const loginUser = async (email, password) => {
    try {


        // Check if there's an active session and delete it
        try {
            await account.deleteSession('current');
            console.log('Previous session deleted successfully.');
        } catch (error) {
            console.log('No active session found. Proceeding...');
        }
        
        const session = await account.createEmailPasswordSession(email, password);
        console.log('User logged in successfully:', session);
        return session;
    } catch (error) {
        //console.error('Error logging in:', error);
        throw error;
    }
};


export const getCurrentUserRoleFromPrefs = async () => {
    try {
        const user = await account.get(); // This returns the current authenticated user's session
        console.log('User data retrieved successfully:', user);

        // Check if the role is set in user preferences
        if (!user.prefs || !user.prefs.role) {
            throw new Error('User role is not defined.');
        }
      return user;
    }catch (error) {
        console.error('Error fetching user data:');
        throw error;
    }
};


export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get(); // This returns the current authenticated user's session
        if(!currentAccount) throw new Error('No current account found');

        const currentUser = await databases.listDocuments(
             config.databaseId,
             config.userCollectionId,
             [Query.equal('accountId', currentAccount.$id)]
        )
        
        if(!currentUser.documents.length) throw new Error('User not found in database');
        return currentUser.documents[0]; //cause we only need one user
    }catch(error){
       // console.error('Error getting current user', error);
        throw error; // Re-throw the error if needed to handle it in the calling function
    }
}


export const verifyEmail = async (userId, secret) => {
    try{

        const response = await account.updateVerification(userId, secret);
        console.log('Email verified successfully:', response);
        return response;

    }catch(error){
        console.error('Error verifying email', error);
        throw error;
    }
}


export const getAllNurses = async() => {
    try{

        const nurses = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('roles', 'nurse'), Query.limit(4)]
        )

        return nurses.documents;

    }catch(error){
        throw error;
    }
}


// Function to log out the current user
export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

