import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Box, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getEventsEndpoint, IEvent } from "../../backend";
import getToday from "../../components/getToday";

const useStyles = makeStyles({
    table: {
        tableLayout: 'fixed',
        minHeight: '100%',
        "& td ~ td, & th ~ th": {
            borderLeft: "1px solid gray"
        },
        "& td": {
            verticalAlign: 'top',
            overflowX: 'hidden'
        },
    },
    dayOfMonth: {

    },
    event: {
        display: 'block',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
    }
})

    const DAYS_OF_WEEK = ['DOM', "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]


export default function Calendar() {

    const classes = useStyles()
    
    const [events, setEvents] = useState<IEvent[]>([])
    const weeks = generateCalendar(getToday(), events)
    const firstDate = weeks[0][0].date
    const lastDate = weeks[weeks.length -1][6].date

    useEffect(() => {
        getEventsEndpoint(firstDate, lastDate).then(setEvents)
    }, [firstDate, lastDate])


    return <Box style={{ display: 'flex', height: '100%', alignItems: 'stretch' }}>
        <Box style={{ borderRight: '1px solid gray', minWidth: '15%', padding: 16 }}>
            <h2>Agenda em react</h2>

            <Button variant="contained" color="primary">Novo Evento</Button>

            <Box style={{}}>
                <h3>Agendas</h3>

                <FormControlLabel
                    control={<Checkbox />} label={'Pessoal'} />
                <FormControlLabel
                    control={<Checkbox />} label={'Trabalho'} />
            </Box>
        </Box>

        <TableContainer >
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {DAYS_OF_WEEK.map((item, index) => <TableCell key={index} align="center">{item}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weeks.map((week, index) => <TableRow key={index}>
                        {week.map((cell, index) => <TableCell key={index} align="center">
                            {cell.date}
                            {cell.events.map((event) => <div className={classes.event}>{event.time || ''} {event.desc}</div>)}
                            </TableCell>)}
                    </TableRow>)}

                </TableBody>
            </Table>
        </TableContainer>
    </Box>
}



interface ICalendarCell {
    date: string,
    events: IEvent[]
}

function generateCalendar(date: string, allEvents: IEvent[]): ICalendarCell[][] {

    const weeks: ICalendarCell[][] = []
    const jsDate = new Date(date + "T12:00:00")
    const currentMonth = jsDate.getMonth()

    const currentDay = new Date(jsDate.valueOf())
    currentDay.setDate(1)
    const dayOfWeek = currentDay.getDay()
    currentDay.setDate(1 - dayOfWeek)

    do {
        const week: ICalendarCell[] = []
        for(let i = 0; i < DAYS_OF_WEEK.length; i++){
            const day = currentDay.getDate().toString().padStart(2, "0")
            const month = currentDay.getMonth().toString().padStart(2, "0")

            const isoDate = `${currentDay.getFullYear()}-${month}-${day}`

            week.push({date: isoDate, events: allEvents.filter(e => e.date === isoDate)})
            currentDay.setDate(currentDay.getDate() + 1)
        }
        weeks.push(week)
    } while (currentDay.getMonth() === currentMonth)

    return weeks

}