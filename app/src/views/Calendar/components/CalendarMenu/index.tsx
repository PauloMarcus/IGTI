import { Box, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import { ICalendar } from "../../../../backend";
import React from "react";

type Props = {
    calendars: ICalendar[],
    toggleCalendar: (i:number) => void,
    calendarsSelected: boolean[],
    onNewEvent: (open: boolean) => void
}

export const CalendarMenu = React.memo((props: Props) => {
    const { calendars, toggleCalendar, calendarsSelected, onNewEvent } = props

    return (
        <Box style={{ borderRight: '1px solid rgb(224,224,224)', minWidth: '15%', padding: 16 }}>
            <h2>Agenda em react</h2>

            <Button variant="contained" color="primary" onClick={() => onNewEvent(true)}>Novo Evento</Button>

            <Box style={{}}>
                <h3>Agendas</h3>
                {calendars.map((calendar, i) => <FormControlLabel key={calendar.id} control={<Checkbox onChange={() => toggleCalendar(i)} checked={calendarsSelected[i]} style={{ color: calendar.color }} />} label={calendar.name} />)}
            </Box>
        </Box>
    )
})