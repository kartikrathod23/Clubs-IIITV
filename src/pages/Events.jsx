import React from 'react'
import Header from '../components/Header'
import UpcomingEvents from '../components/UpcomingEvents'
import UpcomingEventsSection from './UpcomingEventsSection'


function Events() {
    return (
        <>
        <Header/>
        <div className='-mt-8'>
        <UpcomingEventsSection/>

        </div>
        </>
    )
}

export default Events
