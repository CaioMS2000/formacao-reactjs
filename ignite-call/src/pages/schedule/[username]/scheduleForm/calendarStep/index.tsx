import { useEffect, useState } from 'react'
import { Calendar } from '../../../../../components/calendar'
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from './styles'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '../../../../../lib/axios'

interface Availability {
    possibleTimes: number[]
    availableTimes: number[]
}

export function CalendarStep() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [availability, setAvailability] = useState<Availability|null>(null)
    const isDateSelected = selectedDate !== null
    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const describedDate = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null
    const router = useRouter()
    const username = String(router.query.username)

    useEffect(() => {
        if(selectedDate){
            const date = dayjs(selectedDate).format('YYYY-MM-DD')
            console.log(date)
            api.get(`/users/${username}/availability`, {
                params: {
                    date,
                }
            }).then(response => {
                setAvailability(response.data)
            })	
        }
    }, [selectedDate, username])

    return (
        <>
            <Container isTimePickerOpen={isDateSelected}>
                <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
                {isDateSelected && (
                    <TimePicker>
                        <TimePickerHeader>{weekDay} <span>{describedDate}</span></TimePickerHeader>
                        <TimePickerList>
                            {availability?.possibleTimes.map(hour => {
                                return <TimePickerItem key={hour} disabled={!availability.availableTimes.includes(hour)}>{String(hour).padStart(2, '0')}</TimePickerItem>
                            })}
                        </TimePickerList>
                    </TimePicker>
                )}
            </Container>
        </>
    )
}
