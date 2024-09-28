'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { PropsWithChildren, HTMLProps } from 'react'
import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    Tooltip,
} from 'recharts'
import colors from 'tailwindcss/colors';

interface RevenueChartProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

const data = [
    { date: '10/23', revenue: 400 },
    { date: '10/24', revenue: 550 },
    { date: '10/25', revenue: -200 },
    { date: '10/26', revenue: 700 },
    { date: '10/27', revenue: 300 },
    { date: '10/28', revenue: -150 },
    { date: '10/29', revenue: 600 },
]
export function RevenueChart({ ...rest }: RevenueChartProps) {
    return (
        <>
            <Card className="col-span-6">
                <CardHeader className="flex-row items-center justify-between pb-0">
                    <div className="space-y-1">
                        <CardTitle className="text-base font-medium">
                            Receita do período
                        </CardTitle>
                        <CardDescription>
                            Receita diária no período
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width={'100%'} height={248}>
                        <LineChart data={data} style={{ fontSize: 12 }}>
                            <XAxis dataKey={'date'} tickLine={false} axisLine={false} dy={16}/>
                            <YAxis
                                width={80}
                                stroke="#888"
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value: number) =>
                                    value.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })
                                }
                            />
                            <Line
                                type={'linear'}
                                dataKey={'revenue'}
                                strokeWidth={2}
                                stroke={colors.violet[500]}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </>
    )
}
