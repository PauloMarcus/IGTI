import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Box, Button, Checkbox, FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minHeight: '100%',
        "& td ~ td, & th ~ th": {
            borderLeft: "1px solid gray"
        }
    }
})


export default function Calendar() {

    const classes = useStyles()

    const DAYS_OF_WEEK = ['DOM', "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

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
                    <TableRow>
                        {DAYS_OF_WEEK.map((item, index) => <TableCell key={index} align="center">x</TableCell>)}
                    </TableRow>
                    <TableRow>
                        {DAYS_OF_WEEK.map((item, index) => <TableCell key={index} align="center">x</TableCell>)}
                    </TableRow>
                    <TableRow>
                        {DAYS_OF_WEEK.map((item, index) => <TableCell key={index} align="center">x</TableCell>)}
                    </TableRow>
                    <TableRow>
                        {DAYS_OF_WEEK.map((item, index) => <TableCell key={index} align="center">x</TableCell>)}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Box>


}