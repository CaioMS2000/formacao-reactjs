import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession, getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const timeIntervalsBodySchema = z.object({
    intervals: z.array(
        z.object({
            weekDay: z.number(),
            startTimeInMinutes: z.number(),
            endTimeInMinutes: z.number(),
        })
    ),
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') return res.status(405).end()

    // const
    let session = await unstable_getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res)
    ) // aparentemente 'unstable_getServerSession' foi renomeado para 'getServerSession'
    session = await getServerSession(req, res, buildNextAuthOptions(req, res))

    if (!session) {
        return res.status(401).end()
    }

    const { intervals } = timeIntervalsBodySchema.parse(req.body)

    // for (const interval of intervals) {
    //     await prisma.userTimeInterval.create({
    //         data: {
    //             weekDay: interval.weekDay,
    //             startTimeInMinutes: interval.startTimeInMinutes,
    //             endTimeInMinutes: interval.endTimeInMinutes,
    //             userId: session.user.id,
    //         },
    //     })
    // }

    // OR

    await Promise.all(
        intervals.map(interval => {
            return prisma.userTimeInterval.create({
                data: {
                    weekDay: interval.weekDay,
                    startTimeInMinutes: interval.startTimeInMinutes,
                    endTimeInMinutes: interval.endTimeInMinutes,
                    userId: session.user.id,
                },
            })
        })
    )

    // quando não estamos usando o SQLite, podemos usar o método 'createMany' ao invés de iterar sobre os intervalos e criar um por um

    return res.status(201).end()
}
