import React, { useState, useEffect } from 'react';
import authService from '../appwrite/config';
import Header from '../components/Header';
import ClubNavbar from '../components/ClubNavbar';

const ProfilePage = () => {
    const [img, setImg] = useState(null);
    const [userProfile, setUserProfile] = useState({
        userId: '',
        name: '',
        club: '',
        email: '',
        joinedDate: '',
        profilePicture: '',
    });

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    const profileData = await authService.getProfile({ userEmail: user.email });
                    setUserProfile({
                        userId: user.$id,
                        name: profileData.name,
                        club: profileData.club,
                        email: profileData.email,
                        joinedDate: profileData.joinedDate,
                        profilePicture: profileData.profilePicture || '', 
                    });

                    const fileId = await authService.getProfileImageByUserId(user.$id);
                    if (fileId) {

                        const imageUrl = await authService.getFile(fileId);
                        setUserProfile((prevProfile) => ({
                            ...prevProfile,
                            profilePicture: imageUrl, 
                        }));
                    }
                }
            } catch (e) {
                console.error("Error fetching user profile:", e);
            }
        };

        getUserProfile();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            setImg(file);
        }
    };

    const updateProfilePic = async () => {
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
            console.log("Uploaded profile image file ID:", newFileId); 

            const newImageUrl = await authService.getFile(newFileId);
            console.log("New profile image URL:", newImageUrl);


            setUserProfile((prevProfile) => ({
                ...prevProfile,
                profilePicture: newImageUrl, 
            }));
        } catch (e) {
            console.error("Error uploading profile image:", e);
        }
    };

    return (
        <>
            <ClubNavbar club={userProfile.club} />
            <div className=" mb-10 max-w-4xl mx-auto p-6 backdrop-filter backdrop-blur-sm bg-black bg-opacity-40 rounded-lg shadow-lg mt-10">
                <div className="text-center">
          
                    <div className="mb-6">
      
                        <img
                            src={userProfile.profilePicture || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mx-auto border-4 border-pink-500"
                        />
                    </div>

                    {/* <div className="flex justify-center mt-1">
                        <label
                            htmlFor="fileInput"
                            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:text-pink-40 text-white px-6 py-2 rounded-full hover:bg-blue-700 flex items-center justify-center cursor-pointer"
                        >
                            Edit Picture
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleProfilePictureChange} 
                        />
                        <button
                            onClick={updateProfilePic}
                            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:text-pink-40 text-white px-6 py-2 rounded-full hover:bg-blue-700 flex items-center justify-center cursor-pointer"
                        >
                            Save
                        </button>
                    </div> */}
                </div>

                <div className="space-y-4 mt-8">
            
                    <div className="flex justify-between items-center">
                        <div className="font-medium text-white">Username:</div>
                        <div className="text-white">{userProfile.name}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium text-white">User ID:</div>
                        <div className="text-white">{userProfile.userId}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium text-white">Club:</div>
                        <div className="text-white">{userProfile.club}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium text-white">Email:</div>
                        <div className="text-white">{userProfile.email}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="font-medium text-white">Joined On:</div>
                        <div className="text-white">{formatDate(userProfile.joinedDate)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
