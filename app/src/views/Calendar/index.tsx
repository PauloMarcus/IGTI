import { Box, Button } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar, IEvent } from "../../backend";
import { useParams } from "react-router-dom";

import { CalendarTable } from "./components/CalendarTable";
import { CalendarHeader } from "./components/CalendarHeader";
import generateCalendar from "./components/GenerateCalendar";
import { CalendarMenu } from "./components/CalendarMenu";
import {CreateEventDialog} from "../../components/Dialog/CreateEventDialog";
import getToday from "../../components/getToday";
import React from "react";


export default function Calendar() {
    const { month } = useParams<{ month: string }>()

    const [events, setEvents] = useState<IEvent[]>([])
    const [calendars, setCalendars] = useState<ICalendar[]>([])
    const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([])
    const [editingEvent, setEditingEvent] = useState<IEvent | null>(null)

    // const weeks = generateCalendar({date:month + '-01', allEvents: events, calendars: calendars, calendarsSelected: calendarsSelected })

    const weeks = useMemo(() => generateCalendar({ date: month + '-01', allEvents: events, calendars: calendars, calendarsSelected: calendarsSelected })
        , [calendars, calendarsSelected, events, month])

    const firstDate = weeks[0][0].date
    const lastDate = weeks[weeks.length - 1][6].date



    useEffect(() => {
        Promise.all([getCalendarsEndpoint(), getEventsEndpoint(firstDate, lastDate)]).then(([calendars, events]) => {
            setEvents(events)
            setCalendarsSelected(calendars.map(() => true))
            setCalendars(calendars)
        })
    }, [firstDate, lastDate])

    const toggleCalendar = React.useCallback( (i: number) => {
        const newSelected = [...calendarsSelected]
        newSelected[i] = !newSelected[i]
        setCalendarsSelected(newSelected)
    }, [calendarsSelected])

    const newEvent = React.useCallback(() => {
        setEditingEvent({
            date: getToday(),
            desc: '',
            calendarId: calendars[0].id
        })
    }, [calendars])
    
    return <Box style={{ display: 'flex', height: '100%', alignItems: 'stretch' }}>
        <CalendarMenu calendars={calendars} onNewEvent={newEvent} toggleCalendar={toggleCalendar} calendarsSelected={calendarsSelected} />
        <Box style={{ height: "100%" }}>
            <CalendarHeader month={month!} />
            <CalendarTable weeks={weeks} onOpenEvent={(e: IEvent) => setEditingEvent(e)} />
        </Box>
        <CreateEventDialog eventReceived={editingEvent} calendars={calendars} onClose={() => setEditingEvent(null)} />
    </Box>
}


