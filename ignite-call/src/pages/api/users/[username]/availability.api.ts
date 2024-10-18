import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import dayjs from 'dayjs'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') return res.status(405).end()
    
    const username = String(req.query.username)
    const {date} = req.query

    if(!date) return res.status(400).json({message: 'date not provided'})

    const user = await prisma.user.findUnique({
        where: { username },
    })

    if (!user) return res.status(400).json({ message: 'User does not exist' })

    const referenceDate = dayjs(String(date))
    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if(isPastDate){
        return res.json({possibleTimes: [], availableTimes: []})
    }

    const userAvailability = await prisma.userTimeInterval.findFirst({
        where: {
            userId: user.id,
            weekDay: referenceDate.get('day'),
        },
    })

    if(!userAvailability){
        return res.json({possibleTimes: [], availableTimes: []})
    }

    const { endTimeInMinutes, startTimeInMinutes } = userAvailability
    const startHour = startTimeInMinutes / 60
    const endHour = endTimeInMinutes / 60
    const possibleTimes = Array.from({ length: endHour - startHour }).map((_, i) => {
        return startHour + i
    })
    const blockedTimes = await prisma.scheduling.findMany({
        select: {
            date: true,
        },
        where: {
            userId: user.id,
            date: {
                gte: referenceDate.set('hour', startHour).toDate(),
                lte: referenceDate.set('hour', endHour).toDate(),
            },
        },
    })
    const availableTimes = possibleTimes.filter((time) => {
        const isTimeBlocked = blockedTimes.some(
            (blockedTime) => blockedTime.date.getHours() === time
        )
        // const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())
        // return !isTimeBlocked && !isTimeInPast
        return !isTimeBlocked // até o momento, na aula só é usada essa condição
    })

    return res.status(201).json({availableTimes, possibleTimes})
}
