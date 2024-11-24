import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClubNavbar from '../components/ClubNavbar';
import PastEventsGallery from '../components/PastEventsGallery';
import Announcements from '../components/Announcements';
import UpcomingEvents from '../components/UpcomingEvents';
import ClubChatBox from '../components/ClubChatbox';
import authService from '../appwrite/config';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Dashboard = () => {
  const [user, setUser] = useState(false);
  const [club, setClub] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUser(true);
          const userEmail = user.email;
          const details = await authService.getProfile({ userEmail });
          if (details) {
            setClub(details.club);
          }
        } else {
          setUser(false);
        }
      } catch (e) {
        console.error(e);
        setUser(false);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!isLogin()) {
      navigate('/login');
    }
  }, []);

  const isLogin = async () => {
    try {
      return await authService.getCurrentUser();
    } catch (e) {
      throw e;
    }
  };

  if (!user) return null;

  return (
    <>
      <ClubNavbar club={club} />
      {club ? (
        <div className="flex flex-col md:flex-row gap-4 p-4 min-w-full ">

          <div className="md:w-2/3 w-full">
            <ClubChatBox />
          </div>

          <div className="w-1 bg-gradient-to-b from-purple-600 to-pink-600 shadow-3xl shadow-pink-white -mt-7 rounded-full"></div>

          <div className="flex flex-col gap-4  md:justify-between md:w-1/3 w-full">
            <Announcements club={club} />
            <UpcomingEvents club={club} />
            <PastEventsGallery club={club} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Dashboard;
