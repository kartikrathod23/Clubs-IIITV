import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal'; 
import bg1 from '../images/bg1.jpg';
import authService from '../appwrite/config'; 
import { ID } from 'appwrite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

const Announcements = ({ club }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await authService.showAnnouncements({ club });
        setAnnouncements(response.documents);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, [club]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      let scrollPosition = 0;

      const scrollInterval = setInterval(() => {
        scrollPosition += 1;
        if (scrollPosition >= container.scrollHeight - container.clientHeight) {
          scrollPosition = 0;
        }
        container.scrollTop = scrollPosition;
      }, 50);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  const handleAddAnnouncement = async (newAnnouncement) => {
    try {
      const response = await authService.createAnnouncement({
        id: ID.unique(),
        title: newAnnouncement.title,
        dateTime: newAnnouncement.dateTime,
        description: newAnnouncement.description,
        club,
      });
      setAnnouncements((prev) => [...prev, response]);
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };


  const handleDelete = async (announcementId) => {
    try {
      await authService.deleteAnnouncement(announcementId);
      setAnnouncements((prev) =>
        prev.filter((announcement) => announcement.$id !== announcementId)
      );
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC', 
    };
  
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="relative backdrop-filter backdrop-blur-sm bg-black bg-opacity-35 rounded-lg p-2">
      <div className="flex justify-between">
        <h2 className="font-bold mb-1 text-white text-xl">Announcements</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-600 mb-1 text-white px-3 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      <div
        ref={containerRef}
        className="p-4 bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden h-32"
        style={{ maxHeight: '200px', overflowY: 'hidden' }}
      >
        <ul className="space-y-2">
          {announcements.map((announcement) => (
            <li key={announcement.$id} className="mb-3 relative">
              <button
                onClick={() => handleDelete(announcement.$id)}
                className="absolute top-1 right-1 text-white bg-black p-1 rounded-full opacity-75 hover:opacity-100 flex items-center justify-center"
                style={{ width: '30px', height: '30px', fontSize: '14px' }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <h3 className="font-semibold text-md text-white">{announcement.title}</h3>
              <p className="text-gray-200">{announcement.description}</p>
              <p className="text-sm text-gray-200">{formatDateTime(announcement.dateTime)}</p>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddAnnouncementForm
          onClose={() => setIsModalOpen(false)}
          onAddAnnouncement={handleAddAnnouncement}
        />
      </Modal>
    </div>

  );
};

const AddAnnouncementForm = ({ onClose, onAddAnnouncement }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.dateTime) {
      onAddAnnouncement(formData);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Add Announcement</h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Date and Time</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Add
        </button>
      </div>
    </form>
  );
};

export default Announcements;