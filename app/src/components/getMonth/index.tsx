const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]

export default function getMonth(isoMonth: string){
    const [year, month] = isoMonth.split('-')

    return `${months[parseInt(month) - 1]} de ${year}`

}

export function prevMonth(month: string){
    const jsDate = new Date(month + "-01T12:00:00")
    jsDate.setMonth(jsDate.getMonth() - 1)
    return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2,'0')}`
}


export function nextMonth(month: string){
    const jsDate = new Date(month + "-01T12:00:00")
    jsDate.setMonth(jsDate.getMonth() + 1)
    return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2,'0')}`
}