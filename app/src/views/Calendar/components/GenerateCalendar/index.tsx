import { ICalendar, IEvent } from "../../../../backend"

export interface ICalendarCell {
    date: string,
    dayOfMonth: number,
    events: IEventWithCalendar[]
}

type IEventWithCalendar = IEvent & {
    calendar: ICalendar
}

type Props = {
    date: string, 
    allEvents: IEvent[], 
    calendars: ICalendar[], 
    calendarsSelected: boolean[]
}


export default function generateCalendar(props: Props): ICalendarCell[][] {

    const { date, allEvents, calendars, calendarsSelected} = props
    console.log('asd')
    const weeks: ICalendarCell[][] = []
    const jsDate = new Date(date + "T12:00:00")
    const currentMonth = jsDate.getMonth()

    const currentDay = new Date(jsDate.valueOf())
    currentDay.setDate(1)
    const dayOfWeek = currentDay.getDay()
    currentDay.setDate(1 - dayOfWeek)


    do {
        const week: ICalendarCell[] = []
        for (let i = 0; i < 7; i++) {
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
