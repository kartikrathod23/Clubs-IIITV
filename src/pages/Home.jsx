import React from 'react';
import HomeSection from './HomeSection';
import ClubSection from './ClubSection';
import UpcomingEventsSection from './UpcomingEventsSection';
import Statistics from './Statistics';
import Testimonials from './Testimonials';
import CTASection from './CTASection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommitteesSection from './CommitteesSection';

function Home() {
    return (
        <div>
            <Header />
            <HomeSection />
            <ClubSection />
            <CommitteesSection/>
            <UpcomingEventsSection />
            <Statistics />
            <Testimonials />
            <CTASection />
        </div>
    )
}

export default Home
