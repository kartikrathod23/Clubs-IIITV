import React, { useState } from 'react';
import authService from '../appwrite/config';
import conf from '../conf/conf';
import { ID } from 'appwrite';

const AddEventForm = ({ club, onClose, onEventAdded }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); 

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && date && description && image) {
      try {
        
        const uploadedImage = await authService.uploadFile2(image);
        const imgId = uploadedImage.$id;
        
        const eventData = {
          title,
          date,
          description,
          club,
          imageUrl: uploadedImage ? authService.bucket.getFileView(conf.appwriteBucketId2, imgId) : null, 
        };

        const response = await authService.database.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId04, 
          imgId,
          eventData
        );

        onEventAdded({ ...eventData, id: response.$id });
        onClose(); 
      } catch (error) {
        console.error("Error saving event:", error);
      }
    } else {
      alert("Please fill in all fields including the image.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-md">
      <div>
        <label className="block font-bold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
          placeholder="Event Title"
        />
      </div>
      <div>
        <label className="block font-bold">Date</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-bold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
          placeholder="Event Description"
        />
      </div>
      <div>
        <label className="block font-bold">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Event
        </button>
      </div>
    </form>
  );
};

export default AddEventForm;
