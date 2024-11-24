import React, { useEffect, useState } from 'react';
import authService from '../appwrite/config';
import conf from '../conf/conf';
import { ID, Query } from 'appwrite';
import bg1 from '../images/bg1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

const PastEventsGallery = ({ club }) => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image for larger view

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await authService.database.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId3,
          [Query.equal('club', club)]
        );

        const imageDocs = response.documents.map((doc) => ({
          fileUrl: doc.fileUrl,
          fileId: doc.$id,
        }));
        setImages(imageDocs.reverse());
      } catch (e) {
        console.error('Error fetching images:', e);
      }
    };

    fetchImages();
  }, [club]);

  const addPastEvents = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const uploadedFile = await authService.uploadFile(file);

        if (uploadedFile) {
          const fileUrl = authService.bucket.getFileView(conf.appwriteBucketId01, uploadedFile.$id);

          await authService.database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId3,
            uploadedFile.$id,
            {
              fileUrl,
              club,
            }
          );

          setImages((prev) => [{ fileUrl, fileId: uploadedFile.$id }, ...prev]);
          setFile(null);
        }
      } catch (e) {
        console.error('Error uploading or saving file URL:', e);
      }
    }
  };

  const handleDownload = async (fileId) => {
    try {
      const file = await authService.downloadFile(fileId);
      if (file) {
        console.log(file);
      }
    } catch (e) {
      console.error('Error downloading file:', e);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await authService.deleteFile(fileId);
      await authService.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId3,
        fileId
      );

      setImages((prev) => prev.filter((image) => image.fileId !== fileId));
    } catch (e) {
      console.error('Error deleting file or document:', e);
    }
  };

  return (
    <div className="p-4 backdrop-filter backdrop-blur-sm bg-black bg-opacity-35 rounded-lg shadow-md w-full">
      <div className="flex justify-between">
        <h2 className="font-bold mb-1 text-white text-lg">Memories</h2>
        <div>
          <form onSubmit={addPastEvents}>
            <input
              type="file"
              placeholder="Add Files"
              className="w-40 md:w-52 bg-white"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-700 mb-1 text-white px-3 py-2 rounded-lg"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-none w-48 h-32 bg-cover bg-center rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image.fileUrl)} // Open modal with larger image
            >
              <div
                style={{ backgroundImage: `url(${image.fileUrl})` }}
                className="w-full h-full bg-cover bg-center rounded-lg"
              />
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(image.fileId);
                }}
                className="absolute top-1 left-0 text-white bg-black p-1 rounded-full opacity-75 hover:opacity-100 flex items-center justify-center"
                style={{ width: '25px', height: '25px', fontSize: '16px' }}
              >
                {/* <FontAwesomeIcon icon={faDownload} /> */}
              {/* </button> */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(image.fileId);
                }}
                className="absolute top-1 right-1 text-white bg-black p-1 rounded-full opacity-75 hover:opacity-100 flex items-center justify-center"
                style={{ width: '25px', height: '25px', fontSize: '16px' }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for larger image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
        >
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black p-2 rounded-full hover:bg-gray-800"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-screen-lg max-h-screen rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PastEventsGallery;
