import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { ICalendar, IEvent } from "../../../backend";
import { createEventEndpoint } from "../../../backend";
import { updateEventEndpoint } from "../../../backend";

type Props = {
    eventReceived: IEvent | null,
    onClose: () => void,
    calendars: ICalendar[],

}

async function PostEvent(event: IEvent) {
    if (event.id) {
        await updateEventEndpoint(event)
        window.location.reload()
        return
    }
    else {
        await createEventEndpoint(event)
        window.location.reload()
        return
    }



}

export const CreateEventDialog = React.memo(({ eventReceived, onClose, calendars }: Props) => {

    const [event, setEvent] = React.useState<IEvent | null>(eventReceived)

    React.useEffect(() => {
        setEvent(eventReceived)
    }, [eventReceived])

    const myRef = React.useRef<HTMLInputElement | null>()


    return (
        <div>
            <Dialog open={!!event} onClose={onClose}>
                {event && (<>
                    <DialogTitle>Novo evento</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Insira as informações
                        </DialogContentText>
                        <TextField
                          
                            value={event?.date}
                            autoFocus
                            margin="normal"
                            id="date"
                            type="date"
                            label="Data"
                            onChange={(e) => setEvent({ ...event, date: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            value={event?.time}
                            autoFocus
                            margin="normal"
                            id="time"
                            label="Hora"
                            onChange={(e) => setEvent({ ...event, time: e.target.value })}
                            fullWidth
                            type="time"
                        />
                        <TextField
                          inputRef={myRef}
                            value={event?.desc}
                            onChange={(e) => setEvent({ ...event, desc: e.target.value })}
                            autoFocus
                            margin="normal"
                            id="description"
                            label="Descrição"
                            fullWidth
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Agenda</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={event?.calendarId}
                                label="Agenda"
                                onChange={(e) => setEvent({ ...event, calendarId: e.target.value as unknown as number })}

                            >
                                {calendars.map((calendar) => <MenuItem key={calendar.id} value={calendar.id}>{calendar.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => myRef.current?.focus()}>Cancelar</Button>
                        <Button onClick={() => PostEvent(event)}>Salvar</Button>
                    </DialogActions>
                </>
                )}
            </Dialog>
        </div>
    );
})