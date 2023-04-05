import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Box, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar, IEvent } from "../../backend";
import getToday from "../../components/getToday";
import { useNavigate, useParams } from "react-router-dom";
import getMonth, { nextMonth, prevMonth } from "../../components/getMonth";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "react-router-dom";
const useStyles = makeStyles({
    table: {
        borderTop: "1px solid rgb(224,224,224)",
        tableLayout: 'fixed',
        minHeight: '100%',
        "& td ~ td, & th ~ th": {
            borderLeft: "1px solid rgb(224,224,224)"
        },
        "& td": {
            verticalAlign: 'top',
            overflowX: 'hidden'
        },
    },
    mutedDay: {},

    dayOfMonth: {

    },
    event: {
        display: 'block',
        border: 'none',
        borderRadius: 3,
        paddingLeft: 6,
        color: 'white',
        fontWeight: 300,
        textAlign: 'left',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        marginBottom: 5,
    }
})

const DAYS_OF_WEEK = ['DOM', "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]


export default function Calendar() {

    const { month } = useParams<{ month: string }>()

    const classes = useStyles()

    const [events, setEvents] = useState<IEvent[]>([])
    const [calendars, setCalendars] = useState<ICalendar[]>([])
    const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([])
    const weeks = generateCalendar(month + '-01', events, calendars, calendarsSelected)
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
        <Box style={{ borderRight: '1px solid rgb(224,224,224)', minWidth: '15%', padding: 16 }}>
            <h2>Agenda em react</h2>

            <Button variant="contained" color="primary">Novo Evento</Button>

            <Box style={{}}>
                <h3>Agendas</h3>
                {calendars.map((calendar, i) => <FormControlLabel key={calendar.id} control={<Checkbox onChange={() => toggleCalendar(i)} checked={calendarsSelected[i]} style={{ color: calendar.color }} />} label={calendar.name} />)}


            </Box>
        </Box>
        <Box style={{ height: "100%" }}>

            <Box style={{ height: '10%', display: 'flex', alignItems: 'center' }}>
                <Box style={{display: 'flex', padding: '0 25px'}}>
                    
                    <Link  to={'/calendar/' + prevMonth(month!)}> 
                     <NavigateBeforeIcon  style={{ fontSize: 30 }}/>
                    </Link>
                       
                   
                    <Link to={'/calendar/' + nextMonth(month!)}> 
                    <NavigateNextIcon style={{ fontSize: 30 }}/>
                    </Link>
                        
                 
                </Box>
                <Box component={'h2'}>
                    {getMonth(month!)}
                </Box>
            </Box>
            <TableContainer style={{height: "90%"}}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {DAYS_OF_WEEK.map((item, index) => <TableCell key={index} align="center">{item}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weeks.map((week, index) => <TableRow key={index}>
                            {week.map((cell, index) => <TableCell style={{ background: '' }} key={index} align="center">
                                {cell.dayOfMonth}



                                {cell.events.map((event, i) => {
                                    const color = event.calendar?.color
                                    return <div className={classes.event} key={i} style={{ background: color }}>{event.time || ''} {event.desc}</div>
                                })}
                            </TableCell>)}
                        </TableRow>)}

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Box>
}

type IEventWithCalendar = IEvent & {
    calendar: ICalendar
}

interface ICalendarCell {
    date: string,
    dayOfMonth: number,
    events: IEventWithCalendar[]
}

function generateCalendar(date: string, allEvents: IEvent[], calendars: ICalendar[], calendarsSelected: boolean[]): ICalendarCell[][] {

    const weeks: ICalendarCell[][] = []
    const jsDate = new Date(date + "T12:00:00")
    const currentMonth = jsDate.getMonth()

    const currentDay = new Date(jsDate.valueOf())
    currentDay.setDate(1)
    const dayOfWeek = currentDay.getDay()
    currentDay.setDate(1 - dayOfWeek)


    do {
        const week: ICalendarCell[] = []
        for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
            const day = currentDay.getDate().toString().padStart(2, "0")
            const month = (currentDay.getMonth() + 1).toString().padStart(2, "0")

            const isoDate = `${currentDay.getFullYear()}-${month}-${day}`
            const events: IEventWithCalendar[] = []

            for (const event of allEvents) {
                if (event.date === isoDate) {
                    const calIndex = calendars.findIndex(cal => cal.id === event.calendarId)
                    if (calendarsSelected[calIndex]) {
                        events.push({ ...event, calendar: calendars[calIndex] })
                    }

                }
            }


            week.push({ dayOfMonth: currentDay.getDate(), date: isoDate, events: events })
            currentDay.setDate(currentDay.getDate() + 1)
        }
        weeks.push(week)
    } while (currentDay.getMonth() === currentMonth)

    return weeks

}