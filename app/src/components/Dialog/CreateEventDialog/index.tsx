import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";

type Props = {
    open: boolean,
    onClose: () => void
}

export default function CreateEventDialog({ open, onClose }: Props) {

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Novo evento</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira as informações
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="date"
                        type="date"
                        label="Data"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="time"
                        label="Hora"
                        fullWidth
                        type="time"
                    />
                    <TextField
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
                            value={''}
                            label="Agenda"
                          
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={onClose}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}