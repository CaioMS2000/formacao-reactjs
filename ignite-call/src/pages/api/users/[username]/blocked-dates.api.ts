import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') return res.status(405).end()
    
    const username = String(req.query.username)
    const {year, month} = req.query

    if(!year || !month) return res.status(400).json({message: 'Year or month not provided'})

    const user = await prisma.user.findUnique({
        where: { username },
    })

    if (!user) return res.status(400).json({ message: 'User does not exist' })

    const availableWeekDays = await prisma.userTimeInterval.findMany({
        select: {
            weekDay: true,
        },
        where: {
            userId: user.id,
        },
    })
    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(
        (weekDay) =>
            !availableWeekDays.some(
                (availableWeekDay) => availableWeekDay.weekDay === weekDay
            )
    )
    const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.DATE) AS date,
      COUNT(S.date) AS amount,
      ((UTI.end_time_in_minutes - UTI.start_time_in_minutes) / 60) AS size

    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM S.DATE),
      ((UTI.end_time_in_minutes - UTI.start_time_in_minutes) / 60)

    HAVING amount >= size
  `

  const blockedDates = blockedDatesRaw.map((item) => item.date)

    return res.status(201).json({blockedWeekDays, blockedDates})
}
