import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createAccount({ email, password, name, club }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                await this.createProfile({ accountId: userAccount.$id, email, name, club });
                return await this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error during account creation:", error);
            throw new Error(`Signup error: ${error.message}`);
        }
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            return { success: true, message: "Login successful" };
        } catch (e) {
            console.error("Login error:", e);
            throw new Error(`Login error: ${e.message}`);
        }
    }

    async createProfile({ accountId, email, name, club }) {
        try {
            await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId01,
                accountId,
                {
                    name,
                    club,
                    email,
                    joinedDate: new Date().toISOString(),
                    accountId,
                }
            );
        } catch (e) {
            throw e;
        }
    }

    async getProfile({ userEmail }) {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId01,
                [Query.equal("email", userEmail)]
            );

            if (response.documents.length > 0) {
                return response.documents[0];
            } else {
                throw new Error("User profile not found");
            }
        } catch (e) {
            console.error("Error fetching user profile:", e);
            throw e;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async createMessage({ ID, name, email, message, club, sentAt }) {
        try {
            // const userId = ID.unique();
            return this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId02,
                ID,
                {
                    ID,
                    name,
                    sentAt,
                    message,
                    email,
                    club,
                }
            )
        } catch (e) {
            throw e
        }
    }

    async showMessages({ club }) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId02,
                [
                    Query.equal('club', club),
                    // Query.orderDesc('$createdAt')

                ]


            )
        } catch (e) {
            throw e
        }
    }

    async showEvents(){
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId04
            )
        }catch(e){
            throw e;
        }
    }
    async uploadFile(pic) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId01,
                ID.unique(),
                pic,
            )
        } catch (e) {
            console.log("File upload error:", e.message); // Log any errors
            throw e;
        }
    }

    async downloadFile(filedId) {
        try {
            return await this.bucket.getFileDownload(
                conf.appwriteBucketId01,
                filedId,
            )

        } catch (e) {
            throw e
        }
    }

    async deleteFile(filedId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId01,
                filedId
            )
        } catch (error) {
            console.log(error)
        }
    }

    

    async uploadFile2(pic) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId2,
                ID.unique(),
                pic,
            )
        } catch (e) {
            // console.log("File upload error:", e.message); // Log any errors
            throw e;
        }
    }
    async deleteFile2(filedId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId2,
                filedId
            )
        } catch (error) {
            console.log(error)
        }
    }
    async showAnnouncements({ club }) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId05,
                [Query.equal('club', club)]
            )
        } catch (e) {
            throw e
        }
    }
    async createAnnouncement({ id, title, dateTime, description, club }) {
        try {
            // const userId = ID.unique();
            return this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId05,
                id,
                {
                    title,
                    dateTime,
                    description,
                    club
                }
            )
        } catch (e) {
            throw e
        }
    }

    async deleteAnnouncement(announcementId) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId05,
                announcementId
            );
        } catch (e) {
            throw e;
        }
    }

    async deleteMessage(id) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId02,
                id
            );
        } catch (e) {
            throw e;
        }
    }


    async uploadProfileImage(file, userId) {
        try {
            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketId03,
                ID.unique(),
                file
            );

            if (uploadedFile) {
                const fileId = uploadedFile.$id;

                await this.database.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId06,
                    ID.unique(),
                    {
                        userId,
                        fileId,
                    }
                );

                return fileId;
            }
        } catch (e) {
            console.error("Error uploading profile image:", e);
            throw e;
        }
    }

    async deleteOldProfileImage(oldFileId) {
        try {
            if (oldFileId) {
                await this.bucket.deleteFile(conf.appwriteBucketId03, oldFileId);
            }
        } catch (e) {
            console.error("Error deleting old profile image:", e);
            throw e;
        }
    }

    async getProfileImageByUserId(userId) {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId06,
                [Query.equal("userId", userId)]
            );

            if (response.documents.length > 0) {
                const document = response.documents[0];
                return document.fileId;
            } else {
                throw new Error("Profile image not found for user");
            }
        } catch (e) {
            console.error("Error fetching profile image:", e);
            throw e;
        }
    }

    async getProfileImageUrlById(fileId) {
        try {
            const fileUrl = `${conf.appwriteUrl}/v1/storage/buckets/${conf.appwriteBucketId03}/files/${fileId}/view`;
            return fileUrl;
        } catch (e) {
            console.error("Error fetching profile image URL:", e);
            throw e;
        }
    }


    updateProfilePic = async () => {
    if (!img) {
        alert("Please select a file to upload.");
        return;
    }

    try {
        const userId = userProfile.userId;

        if (!img.size) {
            throw new Error("Selected file is not valid.");
        }

        const newFileId = await authService.uploadProfileImage(img, userId);

        if (!newFileId) {
            throw new Error("Failed to upload the file. No file ID returned.");
        }

        console.log("Uploaded profile image file ID:", newFileId);

        const newImageUrl = await authService.getFile(newFileId);

        if (!newImageUrl) {
            throw new Error("Failed to fetch the file URL.");
        }

        console.log("New profile image URL:", newImageUrl);

        setUserProfile((prevProfile) => ({
            ...prevProfile,
            profilePicture: newImageUrl,
        }));
    } catch (e) {
        console.error("Error uploading profile image:", e);
    }
};


    async getFile(fileId) {
        try {
            
            const filePreviewUrl = await this.bucket.getFilePreview(conf.appwriteBucketId03, fileId);
            return filePreviewUrl; 
        } catch (e) {
            console.error("Error getting file preview:", e);
            throw e;
        }
    }
    
}

const authService = new AuthService();
export default authService;
