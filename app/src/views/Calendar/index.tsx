import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar, IEvent } from "../../backend";
import { useParams } from "react-router-dom";

import CalendarTable from "./components/CalendarTable";
import CalendarHeader from "./components/CalendarHeader";
import generateCalendar from "./components/GenerateCalendar";
import CalendarMenu from "./components/CalendarMenu";


export default function Calendar() {

    const { month } = useParams<{ month: string }>()

    const [events, setEvents] = useState<IEvent[]>([])
    const [calendars, setCalendars] = useState<ICalendar[]>([])
    const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([])
  
    const weeks = generateCalendar({date:month + '-01', allEvents: events, calendars: calendars, calendarsSelected: calendarsSelected })
    const firstDate = weeks[0][0].date
    const lastDate = weeks[weeks.length - 1][6].date

    useEffect(() => {
        Promise.all([getCalendarsEndpoint(), getEventsEndpoint(firstDate, lastDate)]).then(([calendars, events]) => {
            setEvents(events)
            setCalendarsSelected(calendars.map(() => true))
            setCalendars(calendars)
        })
    }, [firstDate, lastDate])

    function toggleCalendar(i: number) {
        const newSelected = [...calendarsSelected]

        newSelected[i] = !newSelected[i]

        setCalendarsSelected(newSelected)
    }

    return <Box style={{ display: 'flex', height: '100%', alignItems: 'stretch' }}>
       <CalendarMenu calendars={calendars} toggleCalendar={toggleCalendar} calendarsSelected={calendarsSelected} />
        <Box style={{ height: "100%" }}>
            <CalendarHeader month={month!} />

            <CalendarTable weeks={weeks}/>
        </Box>
    </Box>
}


