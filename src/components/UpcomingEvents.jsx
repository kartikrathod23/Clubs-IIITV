  import React, { useState, useEffect } from 'react';
  import Modal from './Modal';
  import AddEventForm from './AddEventForm';
  import { Query } from 'appwrite';
  import authService from '../appwrite/config';
  import conf from '../conf/conf';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faDownload, faTrash ,faHome} from '@fortawesome/free-solid-svg-icons';

  const UpcomingEvents = ({ club }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [id,setId] = useState();

    useEffect(() => {
      const fetchEvents = async () => {
        try {

          const response = await authService.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId04,
            [Query.equal('club', club)]
          );
          console.log(response);

          const sortedEvents = response.documents.sort((a, b) => new Date(a.date) - new Date(b.date));
          setId(response.id);
          setEvents(sortedEvents);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };

      fetchEvents();
    }, [club]);

    
    const handleEventAdded = (newEvent) => {
      const normalizedEvent = {
        ...newEvent,
        date: new Date(newEvent.date).toISOString(),
      };
    
      setEvents((prevEvents) =>
        [normalizedEvent, ...prevEvents].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
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
    
    
    const handleDelete = async (eventId) => {
      try {

        if (eventId) {
          await authService.deleteFile2(eventId);
          console.log("Deleted image from storage:", eventId);
        }

        await authService.database.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId04,
          eventId
        );
        console.log("Deleted event document:", eventId);

        setEvents((prev) => prev.filter((event) => event.$id !== eventId));
      } catch (e) {
        console.error("Error deleting image or document:", e);
      }
    };


    return (
      <div className="p-4 backdrop-filter backdrop-blur-sm bg-black bg-opacity-35 rounded-lg shadow-md w-full">
        <div className="flex justify-between">
          <h2 className="font-bold mb-1 text-lg text-white">Upcoming Events</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-700 mb-1 text-white px-3 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
        <ul className="flex gap-4 overflow-x-auto max-w-full">
          {events.map((event, index) => (
            <li
              key={index}
              className="flex-none w-[calc(100%-0.5rem)] p-2 bg-white rounded-md shadow-md h-auto relative"
            >

              <button
                onClick={() => handleDelete(event.$id)} 
                className="absolute top-1 left-1 text-white bg-black p-1 rounded-full opacity-75 hover:opacity-100 flex items-center justify-center"
                style={{ width: '30px', height: '30px', fontSize: '14px' }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>

              <div className="flex gap-1 pl-12"> 
                <div className="w-60 h-28">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-black">{formatDateTime(event.date)}</p>
                  <p className="w-60 overflow-y-auto text-ellipsis break-words">
                    {event.description}
                  </p>
                </div>
                <div className="h-28 w-48 object-contain">
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="object-fill w-full h-full rounded-lg"
                    />
                  )}
                </div>
              </div>
            </li>


          ))}
        </ul>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddEventForm club={club} onClose={() => setIsModalOpen(false)} onEventAdded={handleEventAdded} />
        </Modal>
      </div>
    );
  };

  export default UpcomingEvents;
