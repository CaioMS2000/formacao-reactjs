import { http, HttpResponse } from 'msw'
import { GetDailyReceiptInPeriodResponse } from '../get-daily-receipt-in-period'

export const getDailyRevenueInPeriodMock = http.get<never, never, GetDailyReceiptInPeriodResponse>("/metrics/daily-receipt-in-period", () => {
    return HttpResponse.json([
        {date: '01/01/2024', receipt: 2000},
        {date: '02/01/2024', receipt: 2500},
        {date: '03/01/2024', receipt: 1800},
        {date: '04/01/2024', receipt: 2200},
        {date: '05/01/2024', receipt: 2300},
        {date: '06/01/2024', receipt: 1900},
        {date: '07/01/2024', receipt: 2100}
    ])
})