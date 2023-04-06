import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import styles from "../styles"
import { ICalendarCell } from "../GenerateCalendar"


type Props= {
    weeks: ICalendarCell[][]
}

const DAYS_OF_WEEK = ['DOM', "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

export default function CalendarTable(props: Props) {
    const classes = styles()

    const { weeks } = props

    return (
        <TableContainer style={{ height: "90%" }}>
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
    )
}